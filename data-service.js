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

// <<--- EMPLOYEE FUNCTIONS --->>
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

module.exports.getEmployeesByStatus = function (status)
{
    return new Promise(function (resolve, reject) {
        // Provide an array of employee objects where status property matches the status param, using the resolve method of the returned promise.

        // Example:
        // "http://localhost:8080/employees?status=Full Time"
        var result = [];    // Array for employee objects.
        
        for (let employee of employees) {
            if (employee.status == status) {
                result.push(employees);
            }
        }

        // If no results match, return a meaningful message, otherwise, resolve.
        result.length == 0 ? reject("No results!") : resolve(result);
    });
}

// This function will provide an array of "employee" objects whose isManager property is true using the resolve method of the returned promise.
module.exports.getManagers = function()
{
    return new Promise(function(resolve, reject) {
        var managers = [];

        if(employees.length != 0) {
            for(let employee of employees) {
                if(employee.isManager == true) {
                   managers.push(employee);
                }
            }
        }
        
        // Return meaningful message if no results returned, or resolve.
        managers.length == 0 ? reject("No results returned!") : resolve(managers);
    });
}

// This function will provide the full array of "department" objects using the resolve method of the returned promise.
module.exports.getDepartments = function()
{
    return new Promise(function (resolve, reject) {
        if(departments.length == 0) {
            reject("No results returned");
        }
        resolve(departments);
    });
}

// Add an employee
module.exports.addEmployee = function(employeeData)
{
    // return promise
    return new Promise(function (resolve, reject) {    
    // if employeeData.isManager is undefined, explicitly set it to false.
    // otherwise set it to true
    employeeData.isManager = !employeeData.isManager ? false : true;

    //explicity set the employeeNum property of employeeData to be the length of the employees array + 1
    employeeData.employeeNum = employees.length + 1;

    // push the updated employee data object onto the employees array and resolve
    employees.push(employeeData);
    resolve(employees);
    });
}
