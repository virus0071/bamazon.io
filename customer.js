var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root", 
    password: " ", 
    database: "bamazon_db"
})

connection.connect(function(err) {
    if (err) throw err;
    userChoice();
  });


function userChoice () {

    var query = "SELECT * FROM products";
    connection.query (query, function (error, response){
        var table = new Table ({
            head: ["ID", "Product", "Department", "Price", "Stock Quantity"]
        });

        console.log("Items for sale:");
        console.log("******************************************");

        for (i=0; i < response.length; i++){
            table.push([
                response[i].item_id, 
                response[i].product_name, 
                response[i].department_name, 
                response[i].price, 
                response[i].stock_quantity
            ]);
        console.log("******************************************");
        console.log(table.toString());

        inquirer.prompt([
            {
                name: "item_id",
                type: "input",
                message: "Which item would you like to purchase? please choose the item ID:",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
            }
        },{
                name:"Quantiity",
                type: "input",
                message: "How many of this item do you want?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                }
            }]).then (function(answer){
                var userChosenId = answer.item_id;
                var userChosenProduct = response[userChosenId];
                var userChosenQuantiity = answer.Quantiity;
                var query = "UPDATE products SET ? WHERE ?"
                if (userChosenQuantiity < userChosenProduct.stock_quantity){
                    console.log("Summary of purchase: " + userChosenProduct + "----- [" + response[userChosenId].price + "] x [" + userChosenQuantiity + "] \r\n" +
                        "Total: " + response[i].price * userChosenQuantiity);
                    connection.query(query, [{stock_quantity: userChosenProduct.stock_quantity - userChosenQuantiity},
                    {
                        id: userChosenProduct.item_id
                    }], function(err, res) {
                        userChoice ();
                    });
                    
                } else {
                    console.log("Sorry, no enough quantity for this item, please reduce the quantity. \r\n Currently, only" + 
                    userChosenProduct.stock_quantity + "are available." );
                    
                }
                userChoice ();
        })
        }

    })
}

userChoice();
