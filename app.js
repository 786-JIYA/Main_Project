const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');

const userModel = require('./models/user');

const cors = require('cors');
const bodyParser = require('body-parser');
const Attendance = require('./models/attendance');


app.use(cors());
app.use(bodyParser.json());

app.set("view engine", "ejs");

// const userModel = require("./usermodel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/read", async (req, res) => {
    let users = await userModel.find();

    res.render("read", { users });
})

app.get("/list", (req, res) => {


    res.render("buslist");
})

app.get("/main", (req, res) => {


    res.render("main");
})

app.get("/student_login", (req, res) => {


    res.render("student_login");
})

app.get("/Slist", (req, res) => {


    res.render("Slist");
})

app.get("/login", (req, res) => {


    res.render("login");
})

app.get("/attendance", (req, res) => {


    res.render("attendance");
})

app.get("/allattendance", (req, res) => {


    res.render("allattendance");
})

app.get("/delete/:id", async (req, res) => {
    let users = await userModel.findOneAndDelete({
        _id: req.params.id
    });

    res.redirect("/read");
})


app.post("/create", async (req, res) => {
    let { name, PRN, place } = req.body;
    let createduser = await userModel.create({
        name,
        PRN,
        place
    })
    res.redirect("/read");
})



// mongoose.connect('mongodb://127.0.0.1:27017/rfid_attendance', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log("MongoDB Connected"))
//     .catch(err => console.error(err));

// app.post('/api/attendance', async (req, res) => {
//     const { uid, time } = req.body;
//     try {
//         const record = new Attendance({ uid, time });
//         await record.save();
//         res.status(201).send("Attendance Recorded");
//     } catch (err) {
//         res.status(500).send("Error saving attendance");
//     }
// });

// app.get('/api/attendance', async (req, res) => {
//     try {
//         const data = await Attendance.find();
//         res.json(data);
//     } catch (err) {
//         res.status(500).send("Error fetching data");
//     }
// });

app.listen(3002);