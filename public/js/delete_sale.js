/*
 Citation for the following app:
 Date: 9/28/2024
 Based on the code provided by the Node.JS starter guide.
 Code was restructured to fit the information in our schema
 Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
 */

function deleteSale(saleID) {
    let link = '/delete-sale-ajax/';
    let data = {
      sale_id: saleID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(saleID);
      }
    });
  }
  
  function deleteRow(saleID){
      let table = document.getElementById("sales-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == saleID) {
              table.deleteRow(i);
              break;
         }
      }
  }
