var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: " ",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    managerControl();
});


function managerControl() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProduct();
                    break;

                case "View Low Inventory":
                    viewLowInven();
                    break;

                case "Add to Inventory":
                    addInven();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

            }
        });
};

function viewProduct(content) {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        var table = new Table({
            head: ["ID", "Product", "Department", "Price", "Stock Quantity"]
        });

        console.log("Items for sale:");
        console.log("******************************************");

        for (i = 0; i < response.length; i++) {
            table.push([
                response[i].item_id,
                response[i].product_name,
                response[i].department_name,
                response[i].price,
                response[i].stock_quantity
            ]);
            console.log("******************************************");
            content();
        };
        managerControl();
    })
};

function viewLowInven(content) {
    var query1 = "SELECT * FROM products WHERE StockQuantity < 3";
    connection.query(query1, function (err, res) {
        if (err) throw err;
        if (res.length === 0) {
            console.log("No low inventory items.")
            content();
        } else {
            var table = new Table({
                head: ["ID", "Product", "Department", "Price", "Stock Quantity"]
            });
            for (i = 0; i < res.length; i++) {
                table.push([
                    response[i].item_id,
                    response[i].product_name,
                    response[i].department_name,
                    response[i].price,
                    response[i].stock_quantity
                ]);
            }
            console.log("Low inventory items: ")
            console.log(table.toString());
            content();
        };
        managerControl()
    });
};

function addInven() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Which Item would you like to add inventory?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, {
            name: "Quantity",
            type: "input",
            message: "How many would you like to add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        var query2 = "SELECT * FROM products WHERE ?";
        connection.query(query2, { item_id: answer.item_id }, function (err, res) {
            if (err) throw err;

            if (answer.length === 0) {
                console.log("ERROR: Invalid ID. Try a valid ID please.");
                addInven();
            } else {
                var query3 = "UPDATE products SET stock_quantity" + res[0].stock_quantity + answer.quantity + "WHERE item_id=" + answer.item_id;
                connection.query(query3, function (err, resp) {
                    if (err) throw err;
                    console.log("Item [" + answer.item_id + "] + has added" + answer.quantity + "to:" + (res[0].stock_quantity + answer.quantity))
                    console.log("***************************************** \r\n");
                    
                })
            }
            managerControl();
        })
    })
};

function addNewProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "What is the product name?"
        }, {
            name: "department_name",
            type: "input",
            message: "What is the departmant name?"
        }, {
            name: "price",
            type: "input",
            message: "What is the price?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, {
            name: "stock_quantity",
            type: "input",
            message: "What is the quantity?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function (answer1) {

        console.log("New Item: \r\n" +
            "product_name: " + answer1.product_name + "\r\n" +
            "department_name: " + answer1.department_name + "\r\n" +
            "price: " + answer1.price + "\r\n" +
            "stock_quantity: " + answer1.stock_quantity + "\r\n"
        );

        var query4 = "INSERT INTO products SET ?";

        connection.query(query4, answer1, function (err, res) {
            if (err) throw err;

            console.log("New item added: \r\n ID:" + res.insertID +
                "\r\n***************************************** \r\n");
            managerControl();   
        });
    });


};

managerControl()