const fs = require('fs');
var employees = [];
var departments = [];


// <<--- INITIALIZE EMPLOYEES --->>
// Read the contents of the employees.json file.
module.exports.initialize = function() {
    return new Promise(function(resolve, reject) {
    try {
        fs.readFile('./data/employees.json', (err, data) => 
            {
                if (err) reject(err);
                // Convert file contents into array of objects using JSON parse.
                employees = JSON.parse(data);

                // Only once the read operation has completed succesfully, repeat the process for departments.json
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

// <<--- EMPLOYEES --->>
// Add an employee
module.exports.addEmployee = function(employeeData) {
    return new Promise(function (resolve, reject) {    
        // if employeeData.isManager is undefined, set it to false, else set to true.
        employeeData.isManager = !employeeData.isManager ? false : true;

        // set employeeNum to the length of employees array + 1
        employeeData.employeeNum = employees.length + 1;

        // push employee data object into employees array, resolve.
        employees.push(employeeData);
        resolve(employees);
    });
}

module.exports.getAllEmployees = function () {
    // Provide array of all employees, using resolve method of returned promise.
    
    return new Promise(function(resolve, reject) {
        employees.length == 0 ? reject("no results returned") : resolve(employees);
    });
}

module.exports.getEmployeesByStatus = function (status) {
    // Provide array of employees where status property matches status param, using resolve method of returned promise.

    return new Promise(function (resolve, reject) {
        var result = [];    // Array for employee objects.
        
        for (let employee of employees) {
            if (employee.status.toLowerCase() == status.toLowerCase()) {
                result.push(employees);
            }
        }

        // If no results match, return a meaningful message, otherwise, resolve.
        result.length == 0 ? reject("No employees match status: " + status + "!") : resolve(result);
    });
}

module.exports.getEmployeesByDepartment = function (department) {
    // Provide array of employees whose department property matches the department param.
    return new Promise(function (resolve, reject) {
        var result = [];

        for (let employee of employees) {
            if (employee.department == department) {
                result.push(employee);
            }
        }

        // Return meaningful message if no employees found.
        result.length == 0 ? reject("No employees match dept: " + department + "!") : resolve(result);
    });
}

module.exports.getEmployeesByManager = function (manager) {
    // Provide array of employees where employeeManagerNum matches manager param.
    return new Promise(function (resolve, reject) {
        var result = [];
        console.log(manager);
        for (let employee of employees) {
            if (employee.employeeManagerNum == manager) {
                result.push(employee);
            }
        }

        // Return meaningful message if no employees found.
        result.length == 0 ? reject("No employees with employeeManagerNum: " + manager + "!") : resolve(result);
    });
}

module.exports.getEmployeeByNum = function (num) {
    // Provide a single employee where employeeNum matches num param.
    return new Promise(function (resolve, reject) {
        var result = null;
        for (let employee of employees) {
            if (employee.employeeNum == num) {
                result = employee;
            }
        }

        // Return meaningful message if no employee found.
        !result ? reject("No employees match employeeNum: " + num + "!") : resolve(result);
    })
}

// <<--- MANAGERS --->>
// Provide array of employees where isManager == true, using resolve method of returned promise.
module.exports.getManagers = function() {
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
        managers.length == 0 ? reject("No managers!") : resolve(managers);
    });
}

// Provide the full array of "department" objects using resolve method of returned promise.
module.exports.getDepartments = function() {
    return new Promise(function (resolve, reject) {
        departments.length == 0 ? reject("No departments!") : resolve(departments);
    });
}