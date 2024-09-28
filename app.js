// App.js

/*
 Citation for the following app:
 Date: 9/28/2024
 Based on the code provided by the Node.JS starter guide.
 Code was restructured to fit the information in our schema
 Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
 */

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 7121;                 // Set a port number at the top so it's easy to change in the future
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/

//index page
app.get('/', (req, res) => {
    res.render('index');
});

//customers page
app.get('/customers', function (req, res) {
    let query1 = "SELECT * FROM Customers;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('customers', {data: rows});                  // Render the index.
    })      
});

//employees page
app.get('/employees', function (req, res) {
    let query1 = "SELECT * FROM Employees;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('employees', {data: rows});                  // Render the index.
    })      
});

//sales page
app.get('/sales', function (req, res) {
    let query1 = "SELECT * FROM Sales;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('sales', {data: rows});                  // Render the index.
    })      
});  

//stores page
app.get('/stores', function (req, res) {
    let query1 = "SELECT * FROM Stores;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('stores', {data: rows});                  // Render the index.
    })      
});

//suppliers page
app.get('/suppliers', function (req, res) {
    let query1 = "SELECT * FROM Suppliers;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('suppliers', {data: rows});                  // Render the index.
    })      
});

//stores page
app.get('/suppliers_has_stores', function (req, res) {
    let query1 = "SELECT * FROM Suppliers_has_Stores;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('suppliers_has_stores', {data: rows});                  // Render the index.
    })      
});

// create/add customer
app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (first_name, last_name, email, phone_number, payment_information) VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', ${data.phone_number}, '${data.payment_information}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// create/add sale
app.post('/add-sale-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Sales (description, total_amount, sale_date, Customers_customer_id, Stores_store_id) VALUES ('${data.description}', '${data.total_amount}', '${data.sale_date}', ${data.Customers_customer_id}, '${data.Stores_store_id}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Sales;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// create/add employee
app.post('/add-employee-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (first_name, last_name, email, phone_number, position, salary, hire_date, Stores_store_id ) VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', ${data.phone_number}, '${data.position}', ${data.salary}, '${data.hire_date}', ${data.Stores_store_id})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// create/add store
app.post('/add-store-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Stores (name, location) VALUES ('${data.name}', '${data.location}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Stores;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// create/add supplier
app.post('/add-supplier-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Suppliers (supplier_name, category, email, phone_number, address ) VALUES ('${data.supplier_name}', '${data.category}', '${data.email}', ${data.phone_number}, '${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Suppliers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// create/add suppliers-has-stores
app.post('/add-supplier-has-stores-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Suppliers_has_Stores (Suppliers_supplier_id, Stores_store_id) VALUES ('${data.Suppliers_supplier_id}', '${data.Stores_store_id}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Suppliers_has_Stores;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// delete customer
app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.customer_id);
    let deleteBsg_Customer= `DELETE FROM Customers WHERE customer_id = ?`;
  
  
        // Run the second query
        db.pool.query(deleteBsg_Customer, [customerID], function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
        })
    });

// delete sale
app.delete('/delete-sale-ajax/', function(req,res,next){
    let data = req.body;
    let saleID = parseInt(data.sale_id);
    let delete_Sale= `DELETE FROM Sales WHERE sale_id = ?`;
    
    
        // Run the second query
        db.pool.query(delete_Sale, [saleID], function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
        })
    });

// delete employee
app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let employeeID = parseInt(data.employee_id);
    let delete_Employee= `DELETE FROM Employees WHERE employee_id = ?`;
    
    
        // Run the second query
        db.pool.query(delete_Employee, [employeeID], function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
        })
    });

// delete store
app.delete('/delete-store-ajax/', function(req,res,next){
    let data = req.body;
    let storeID = parseInt(data.store_id);
    let delete_Store= `DELETE FROM Stores WHERE store_id = ?`;
    
    
        // Run the second query
        db.pool.query(delete_Store, [storeID], function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
        })
    });

// delete supplier
app.delete('/delete-supplier-ajax/', function(req,res,next){
    let data = req.body;
    let supplierID = parseInt(data.supplier_id);
    let delete_Supplier= `DELETE FROM Suppliers WHERE supplier_id = ?`;
    
    
        // Run the second query
        db.pool.query(delete_Supplier, [supplierID], function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
        })
    });

// update customer table
app.put('/put-customer-ajax', function(req,res,next){
    let data = req.body;
    
    let customer = parseInt(data.fullname);
    let phoneNumber = parseInt(data.phonenumber);
    
    let queryUpdateCustomer = `UPDATE Customers SET phone_number = ? WHERE customer_id = ?`;
    let selectCustomer = `SELECT * FROM Customers WHERE customer_id = ?`
    
            // Run the 1st query
            db.pool.query(queryUpdateCustomer, [phoneNumber,customer], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
    
                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else
                {
                    // Run the second query
                    db.pool.query(selectCustomer, [customer], function(error, rows, fields) {
    
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
    })});

// update employee table
app.put('/put-employee-ajax', function(req,res,next){
    let data = req.body;
    
    let employee = parseInt(data.fullname);
    let phoneNumber = parseInt(data.phone_number);
    
    let queryUpdateEmployee = `UPDATE Employees SET phone_number = ? WHERE employee_id = ?`;
    let selectEmployee = `SELECT * FROM Employees WHERE employee_id = ?`
    
            // Run the 1st query
            db.pool.query(queryUpdateEmployee, [phoneNumber,employee], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
    
                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else
                {
                    // Run the second query
                    db.pool.query(selectEmployee, [employee], function(error, rows, fields) {
    
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
    })});

// update sale table
app.put('/put-sale-ajax', function(req,res,next){
    let data = req.body;
    
    let saleID = parseInt(data.sale_id);
    let totalAmount = parseInt(data.total_amount);
    
    let queryUpdateSales = `UPDATE Sales SET total_amount = ? WHERE sale_id = ?`;
    let selectSale = `SELECT * FROM Sales WHERE sale_id = ?`
    
            // Run the 1st query
            db.pool.query(queryUpdateSales, [totalAmount, saleID], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
    
                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else
                {
                    // Run the second query
                    db.pool.query(selectSale, [saleID], function(error, rows, fields) {
    
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
    })});
/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});