/*
 Citation for the following app:
 Date: 9/28/2024
 Based on the code provided by the Node.JS starter guide.
 Code was restructured to fit the information in our schema
 Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
 */

// Get the objects we need to modify
let addSupplierForm = document.getElementById('add-supplier-form-ajax');

// Modify the objects we need
addSupplierForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSupplierName = document.getElementById("input-supplier-name");
    let inputCategory = document.getElementById("input-category");
    let inputEmail = document.getElementById("input-email");
    let inputPhoneNumber = document.getElementById("input-pnumber");
    let inputAddress = document.getElementById("input-address");

    // Get the values from the form fields
    let supplierNameValue = inputSupplierName.value;
    let categoryValue = inputCategory.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let addressValue = inputAddress.value;


    // Put our data we want to send in a javascript object
    let data = {
        supplier_name: supplierNameValue,
        category: categoryValue,
        email: emailValue,
        phone_number: phoneNumberValue,
        address: addressValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-supplier-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSupplierName.value = '';
            inputCategory.value = '';
            inputEmail.value = '';
            inputPhoneNumber.value = '';
            inputAddress.value = '';
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("suppliers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let supplierNameCell = document.createElement("TD");
    let categoryCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");
    let addressCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    // Fill the cells with correct data
    idCell.innerText = newRow.supplier_id;
    supplierNameCell.innerText = newRow.supplier_name;
    categoryCell.innerText = newRow.category;
    emailCell.innerText = newRow.email;
    phoneNumberCell.innerText = newRow.phone_number;
    addressCell.innerText = newRow.category;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSupplier(newRow.supplier_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(supplierNameCell);
    row.appendChild(categoryCell);
    row.appendChild(emailCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(addressCell);

    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.supplier_id);

    // Add the row to the table
    currentTable.appendChild(row);
}