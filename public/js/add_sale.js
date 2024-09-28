/*
 Citation for the following app:
 Date: 9/28/2024
 Based on the code provided by the Node.JS starter guide.
 Code was restructured to fit the information in our schema
 Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
 */

// Get the objects we need to modify
let addSaleForm = document.getElementById('add-sale-form-ajax');

// Modify the objects we need
addSaleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDescription = document.getElementById("input-description");
    let inputTotalAmount = document.getElementById("input-total_amount");
    let inputSaleDate = document.getElementById("input-sale_date");
    let inputCustomerID = document.getElementById("input-Customers_customer_id");
    let inputStoreID = document.getElementById("input-Stores_store_id");


    // Get the values from the form fields
    let DescriptionValue = inputDescription.value;
    let TotalAmountValue = inputTotalAmount.value;
    let SaleDateValue = inputSaleDate.value;
    let CustomerIDValue = inputCustomerID.value;
    let StoreIDValue = inputStoreID.value;

    // Put our data we want to send in a javascript object
    let data = {
        description: DescriptionValue,
        total_amount: TotalAmountValue,
        sale_date: SaleDateValue,
        Customers_customer_id: CustomerIDValue,
        Stores_store_id: StoreIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDescription.value = '';
            inputTotalAmount.value = '';
            inputSaleDate.value = '';
            inputCustomerID.value = '';
            inputStoreID.value = '';
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
    let currentTable = document.getElementById("sales-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let totalAmountCell = document.createElement("TD");
    let saleDateCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let storeIDCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    // Fill the cells with correct data
    idCell.innerText = newRow.sale_id;
    descriptionCell.innerText = newRow.description;
    totalAmountCell.innerText = newRow.total_amount;
    saleDateCell.innerText = newRow.sale_date;
    customerIDCell.innerText = newRow.Customers_customer_id;
    storeIDCell.innerText = newRow.Stores_store_id;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSale(newRow.sale_id);
    };
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(descriptionCell);
    row.appendChild(totalAmountCell);
    row.appendChild(saleDateCell);
    row.appendChild(customerIDCell);
    row.appendChild(storeIDCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.sale_id);

    // Add the row to the table
    currentTable.appendChild(row);
}