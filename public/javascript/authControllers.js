const { promisify } = require('util');
const User = require('./../../models/userModel');
const jwt = require('jsonwebtoken');



const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        const token = signToken(newUser._id);

        res.status(201).json({
            status: "success",
            token,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }

};
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide email and password"
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }

        let correct = false;

        // 🔍 Check if password is hashed
        if (user.password.startsWith('$2')) {
            // ✅ Hashed → use bcrypt
            correct = await user.correctPassword(password);
        } else {
            // ⚠️ Plain text (old data)
            correct = password === user.password;
        }

        if (!correct) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }

        // 🔥 OPTIONAL: Upgrade old password to hashed
        if (!user.password.startsWith('$2')) {
            user.password = password; // will be hashed by pre('save')
            await user.save();
        }


        const token = signToken(user._id);

        //cookie-parser
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false   // for localhost (IMPORTANT)
        });


        res.status(200).json({
            status: "success",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
exports.protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        // 2) Check token exists
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Not logged in"
            });
        }

        // 3) Verify token
        const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED:", decoded);

        // check if user still exists
        const freshUser = await User.findById(decoded.id);

        if (!freshUser) {
            return res.status(401).json({
                status: "fail",
                message: "The user belonging to this token no longer exists"
            });
        }

        // attach user to request
        req.user = freshUser;
        //4)check if user changed password
        if (freshUser.changedPasswordAfter(decoded.iat)) {
            return res.status(401).json({
                status: "fail",
                message: "User recently changed password. Please log in again."
            });
        }
        req.user = freshUser;
        next();

    } catch (err) {
        //  Handle JWT-specific errors properly
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                status: "fail",
                message: "Invalid token. Please log in again."
            });
        }

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                status: "fail",
                message: "Your token has expired. Please log in again."
            });
        }

        // Generic error
        return res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};