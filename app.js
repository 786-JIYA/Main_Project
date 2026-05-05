const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();   // ✅ ONLY ONCE

// Models
const Attendance = require('./models/attendance');
const userModel = require('./models/user');
const authController = require('./public/javascript/authControllers');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.headers);
    next();
});

// View engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// =========================
// MongoDB Connection
// =========================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected 🚀"))
    .catch(err => console.error("MongoDB Connection Error:", err.message));

//Cookies -parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// =========================
// EJS PAGES ROUTES
// =========================

app.get("/", (req, res) => {
    res.render("landing");
});

// app.get("/", (req, res) => {
//     res.redirect("/main");   // ✅ now home goes to main
// });

app.get("/main", (req, res) => {
    res.render("main");
});

app.get("/read", authController.protect, async (req, res) => {
    const users = await userModel.find();
    res.render("read", { users });
});

app.get("/list", authController.protect, (req, res) => {
    res.render("buslist");
});

app.get("/student_login", authController.protect, (req, res) => {
    res.render("student_login");
});

app.get("/Slist", authController.protect, (req, res) => {
    res.render("Slist");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/attendance", authController.protect, (req, res) => {
    res.render("attendance");
});

app.get("/allattendance", authController.protect, (req, res) => {
    res.render("allattendance");
});

app.get("/index", authController.protect, (req, res) => {
    res.render("index");
});

app.post("/signup", authController.signup);
app.post("/login", authController.login);


// =========================
// STATIC BUS STOPS PAGE
// =========================

app.get("/stops", (req, res) => {
    stops = [
        { name: "Market Yard", route: "market-yard" },
        { name: "Railway Station", route: "railway-station" },
        { name: "Bus Stand", route: "bus-stand" },
        { name: "DKTE", route: "dkte-college" }
    ];

    res.render("stops", {
        busNo: "MH-09-1234",
        stops
    });
});

// =========================
// CRUD OPERATIONS
// =========================

// Delete user
app.get("/delete/:id", async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.redirect("/read");
    } catch (err) {
        console.error(err);
        res.status(500).send("Delete Error");
    }
});

// Create user
app.post("/create", authController.protect, async (req, res) => {
    try {
        const { name, PRN, place } = req.body;
        await userModel.create({ name, PRN, place });
        res.redirect("/read");
    } catch (err) {
        console.error(err);
        res.status(500).send("Create Error");
    }
});


// =========================
// ATTENDANCE API (ESP8266 / ESP32)
// =========================

// POST attendance
app.post('/api/attendance', async (req, res) => {
    try {
        const { uid, time } = req.body;

        const record = new Attendance({
            uid,
            time: time || new Date()
        });

        await record.save();
        res.status(201).send("Attendance Recorded");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving attendance");
    }
});

// GET attendance
app.get('/api/attendance', async (req, res) => {
    try {
        const data = await Attendance.find().sort({ _id: -1 });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    }
});

// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 3002;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} 🚀`);
});