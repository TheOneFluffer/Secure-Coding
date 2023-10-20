//Name: Lau Hong Wei
//Class: DISM/FT/2B/24
//Admin number: 2241319
const mysql = require("mysql");

var dbConnect = 
{
    getConnection: function () 
    {
        var conn = mysql.createConnection(
        {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'Neko sama 123',
            database: 'electronics_shop',
            dateStrings: true
        });
        return conn;
    }
};
  
  
// put this at the end of the file
module.exports = dbConnect;