/*
 Citation for the following app:
 Date: 9/28/2024
 Based on the code provided by the Node.JS starter guide.
 Code was restructured to fit the information in our schema
 Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
 */

// Get the objects we need to modify
let updateSaleForm = document.getElementById('update-sale-form-ajax');

// Modify the objects we need
updateSaleForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSaleID = document.getElementById("mySelect");
    let inputTotalAmount = document.getElementById("input-total-update");

    // Get the values from the form fields
    let saleIDValue = inputSaleID.value;
    let totalAmountValue = inputTotalAmount.value;

    if (isNaN(saleIDValue)) 
    {
        return;
    }
    if (isNaN(totalAmountValue)) 
    {
        totalAmountValue = 0 ;
    }

    // Put our data we want to send in a javascript object
    let data = {
        sale_id: saleIDValue,
        total_amount: totalAmountValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, saleIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, saleID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("sales-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == saleID) {

            // Get the location of the row where we found the matching sale ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of total amount value
            let td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign total amount to our value we updated to
            td.innerHTML = parsedData[0].total_amount; 

       }
    }
}