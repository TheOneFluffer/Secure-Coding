//Name: Lau Hong Wei
//Class: DISM/FT/2B/24
//Admin number: 2241319
var db = require('./databaseConfig.js');
var config = require('../config.js');
var jwt = require('jsonwebtoken');

const productDB = 
{    
    //Get product
    getProduct: function (callback) {
        var dbConn = db.getConnection();

        dbConn.connect(function (err) {
            //connect to mysql db
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                //Success connection to database
                var sql = "SELECT * FROM products;";
                dbConn.query(sql, [], function (err, results) {
                    return callback(err, results);
                })
            }
        });
    },


    //Add a new product
	addProduct: function (name, description, brand, categoryID, imageurl, callback) {

		var conn = db.getConnection();

		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			} else {

				console.log("Connected!");
				sql = "INSERT INTO products (name, description, brand, categoryID, imageurl) values(?, ?, ?, ?, ?);";
				conn.query(sql, [name, description, brand, categoryID, imageurl], function (err, result) {
					conn.end();

					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});

			}
		});
	},


	//Add a new product
	editProduct: function (name, description, brand, categoryID, imageurl, productid, callback) {

		var conn = db.getConnection();

		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			} else {

				console.log("Connected!");
				sql = "UPDATE products SET name = ?, description = ?, brand = ?, categoryID = ?, imageurl = ? WHERE productid = ?;";
				conn.query(sql, [name, description, brand, categoryID, imageurl, productid], function (err, result) {
					conn.end();

					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});

			}
		});
	},

	//Delete a product
	deleteProduct: function (productid, callback) {

		var conn = db.getConnection();

		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			} else {

				console.log("Connected!");
				sql = "DELETE FROM products WHERE productid = ?;";
				conn.query(sql, [productid], function (err, result) {
					conn.end();

					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});

			}
		});
	}
    // End of usersDB program
}

module.exports = productDB;