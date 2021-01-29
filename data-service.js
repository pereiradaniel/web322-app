const fs = require('fs');
var employees = [];
var departments = [];

// This function will read the contents of the employees.json file.
module.exports.initialize = function()
{
    return new Promise(function(resolve, reject) {
    try {
        fs.readFile('./data/employees.json', (err, data) => 
            {
                if (err) reject(err);
                // Convert the file's contents into an array of objects using JSON parse.
                // Assign to the employees array.
                employees = JSON.parse(data);

                // Only once the read operation has completed succesfully, repate the process for departments.json
                fs.readFile('./data/departments.json', (err, data) =>
                {       
                    if (err) reject(err);
                    departments = JSON.parse(data);
                });   
            }); 
            resolve("File read successful.")
        } catch {reject ("File read unsuccessful!")};
    });
}

// This function will provide the full array of "employee" objects using the resolve method of the returned promise.
module.exports.getAllEmployees = function ()
{
    return new Promise(function(resolve, reject) {
        resolve(employees);
        if (employees.length == 0) {
            reject("no results returned");
        }
    });
}

// This function will provide an array of "employee" objects whose isManager property is true using the resolve method of the returned promise.
module.exports.getManagers = function()
{
    return new Promise(function(resolve, reject) {
        var managers = [];

        if(employees.length != 0) {
            for(var i = 0; i < employees.length; i++) {
                if(employees[i].isManager == true) {
                   managers.push(employees[i]);
                }
            }
        }
        else {
                reject("no results return");
        }
        resolve(managers);
    });
}


// This function will provide the full array of "department" objects using the resolve method of the returned promise.
module.exports.getDepartments = function()
{
    return new Promise(function (resolve, reject) {
        resolve(departments);
        if(departments.length == 0) {
            reject("No results returned");
        } 
    });
}


