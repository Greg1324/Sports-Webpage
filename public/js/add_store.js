/*
 Citation for the following app:
 Date: 9/28/2024
 Based on the code provided by the Node.JS starter guide.
 Code was restructured to fit the information in our schema
 Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
 */

// Get the objects we need to modify
let addStoreForm = document.getElementById('add-store-form-ajax');

// Modify the objects we need
addStoreForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStoreName = document.getElementById("input-store-name");
    let inputLocation = document.getElementById("input-location");

    // Get the values from the form fields
    let storeNameValue = inputStoreName.value;
    let locationValue = inputLocation.value;


    // Put our data we want to send in a javascript object
    let data = {
        name: storeNameValue,
        location: locationValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-store-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputStoreName.value = '';
            inputLocation.value = '';

            
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
    let currentTable = document.getElementById("stores-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let storeNameCell = document.createElement("TD");
    let locationCell = document.createElement("TD");


    let deleteCell = document.createElement("TD");
    // Fill the cells with correct data
    idCell.innerText = newRow.store_id;
    storeNameCell.innerText = newRow.name;
    locationCell.innerText = newRow.location;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteStore(newRow.store_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(storeNameCell);
    row.appendChild(locationCell);
    row.appendChild(deleteCell);
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.store_id);

    // Add the row to the table
    currentTable.appendChild(row);

}