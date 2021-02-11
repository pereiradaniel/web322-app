/*********************************************************************************
*  WEB322 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Daniel Pereira  Student ID: 037747078  Date: 02 Feb 2021
*
*  Online (Heroku) URL: https://stark-caverns-03291.herokuapp.com/
*
********************************************************************************/ 

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var multer = require("multer");
const fs = require('fs');
const bodyParser = require("body-parser");
var app = express();
var path = require("path");
var dataService = require("./data-service.js");

// Output listening on port message.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
};

// <<--- Set up: MULTER, BODY-PARSER, STATIC --->>
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
// use diskStorage function for naming files instead of the default.
const upload = multer({storage: storage});

// Set middleware for 'urlencoded' form data (normal HTTP post data)
app.use(bodyParser.urlencoded({extended: true}));

// This must be used before routes for server to correctly return "/css/site.css" file!
app.use(express.static('public'));

// <<--- ROUTES --->>
// HOME
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

// ABOUT
app.get("/about", (req,res) => {
    res.sendFile(path.join(__dirname,"/views/about.html"));
});

// IMAGES
app.get("/images/add", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});
app.post("/images/add", upload.single("imageFile"), (req, res) => {
    res.redirect("/images"); // Redirect to images page.
});

app.get("/images", (req, res) => {
    fs.readdir(path.join(__dirname, "/public/images/uploaded"), function(err, items) {
        res.json(items);
    });
});

// MANAGERS
app.get("/managers", (req,res) => {
    dataService.getManagers()
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)})
});

// EMPLOYEES
app.get("/employees/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});
app.post("/employees/add", (req, res) => {
    // console.log(dataService);
    dataService.addEmployee(req.body);
    res.redirect("/employees"); // Redirect to employees page
});

app.get("/employees", (req,res) => {
    if (req.query.status) {
        // Return JSON string consisting of all employees where value is either "Full Time" or "Part Time".
        dataService.getEmployeesByStatus(req.query.status)
            .then((data) => {res.json(data)})
            .catch((err) => {res.json(err)})
    } else if (req.query.department) {
        // Return JSON string consisting of all employees where value could be one of 1, 2, 4, ... 7.
        dataService.getEmployeesByDepartment(req.query.department)
            .then((data) => {res.json(data)})
            .catch((err) => {res.json(err)})
    } else if (req.query.manager) {
        // Return JSON string consisting of all employees where value could be 1, 2, 3, ... 30.
        dataService.getEmployeesByManager(req.query.manager)
            .then((data) => {res.json(data)})
            .catch((err) => {res.json(err)})
    } else {
        // Return JSON string of all employees.
        dataService.getAllEmployees()
            .then((data) => {res.json(data)})
            .catch((err) => {res.json(err)})
    }
});

app.get("/employee/:empId", (req, res) => {
    // Return a JSON formatted string containing the employee whose employeeNum matches the value.
        dataService.getEmployeeByNum(req.params.empId)
            .then((data) => {res.json(data)})
            .catch((err) => {res.json(err)})
});

// DEPARTMENTS
app.get("/departments", (req,res) => {
    dataService.getDepartments()
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)})
});

// Catch 404's
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"/views/404.html"),404);
});

// Only call app.listen() if our call to the initialize() method is successful
dataService.initialize()
.then((data) => {
    // setup http server to listen on HTTP_PORT
    app.listen(HTTP_PORT, onHttpStart);
})
.catch((err) => {
    console.log("Error: " + err);
});