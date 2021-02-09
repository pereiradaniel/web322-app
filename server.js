/*********************************************************************************
*  WEB322 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Daniel Pereira  Student ID: 037747078  Date: 29 Jan 2021
*
*  Online (Heroku) URL: https://stark-caverns-03291.herokuapp.com/
*
********************************************************************************/ 
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var dataService = require("./data-service.js");

// Output listening on port message.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
};

// NOTE: for your server to correctly return the "/css/site.css" file, the "static" middleware must be used:  in your server.js file, add the line: app.use(express.static('public')); before your "routes"
app.use(express.static('public'));

// The route "/" must return the home.html file from the views folder.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

// The route "/about" must return the about.html file from the views folder.
app.get("/about", (req,res) => {
    res.sendFile(path.join(__dirname,"/views/about.html"));
});

// Assignment 3, Step 2: Add new routes.
app.get("/employees/add", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

app.get("/images/add", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

// Routes
app.get("/managers", (req,res) => {
    dataService.getManagers()
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)})
});

app.get("/employees", (req,res) => {
    dataService.getAllEmployees()
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)})
});

app.get("/departments", (req,res) => {
    dataService.getDepartments()
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)})
});

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
