//Name: Lau Hong Wei
//Class: DISM/FT/2B/24
//Admin number: 2241319
var db = require('./databaseConfig.js');

const categoryDB = 
{
    //Show all categories in database
    getCategory: function(callback)
    {
        var dbConn = db.getConnection();

        dbConn.connect(function(err)
        {
            //connect to mysql db
            if(err)
            {
                console.log(err);
                return callback(err, null);
            }
            else
            {
                //Success connection to database
                var sql = "SELECT * FROM category;";
                dbConn.query(sql, [], function(err, results)
                {
                    return callback(err,results);
                })
            }
        });
    },

    //Add category into database
    addCategory: function(categoryname, categorydescription, callback)
    {
        var dbConn = db.getConnection();

        dbConn.connect(function (err)
        {
            if (err)
            {
                console.log(err);
                return callback(err, null);
            }
            else
            {
                console.log("Connected!");

                var sql = 'INSERT INTO category (categoryname, categorydescription) VALUES (?, ?);';

                dbConn.query(sql, [categoryname, categorydescription], function (err, result) 
                {
                    dbConn.end();

                    if (err) 
                    {
                        console.log(err);
                        return callback(err, null);
                    }
                    else
                    {
                        console.log(result.affectedRows);
                        return callback(null, result.affectedRows);
                    }
                });
            }
        });
    }
    // End of categoryMenu program
}

module.exports = categoryDB;