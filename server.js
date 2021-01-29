/*********************************************************************************
*  WEB322 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Daniel Pereira  Student ID: 037747078  Date: 22 Jan 2021
*
*  Online (Heroku) URL: https://pure-mountain-17983.herokuapp.com
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

// Routes
app.get("/managers", (req,res) => {
    res.send("This route will return a JSON formatted string containing all the employees whose isManager property is set to true.");
});

app.get("/employees", (req,res) => {
    res.send("This route will return a JSON formatted string containing all of the employees within the employees.json file.");
});

app.get("/departments", (req,res) => {
    res.send("This route will return a JSON formatted string containing all of the departments within the departments.json file.");
});

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"/views/404.html"),404);
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);