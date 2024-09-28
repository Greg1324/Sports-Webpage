/*
 Citation for the following app:
 Date: 9/28/2024
 Based on the code provided by the Node.JS starter guide.
 Code was restructured to fit the information in our schema
 Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
 */

function deleteCustomer(customerID) {
    let link = '/delete-customer-ajax/';
    let data = {
      customer_id: customerID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(customerID);
      }
    });
  }
  
  function deleteRow(customerID){
      let table = document.getElementById("customers-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == customerID) {
              table.deleteRow(i);
              break;
         }
      }
  }

  function deleteDropDownMenu(customerID){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(customerID)){
        selectMenu[i].remove();
        break;
      } 
  
    }
  }