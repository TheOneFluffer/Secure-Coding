var jwt = require('jsonwebtoken');
var config = require('../config');

var verifyAdmin = 
{

    verifyAdmin: function (req, res, next)
    {

        var token = req.headers['authorization'];

        res.type('json');
        if (!token || !token.includes("Bearer ")) 
        {

            res.status(403);
            res.send(`{"Message":"Not Authorized"}`);

        }
        
        else 
        {
            //token = token.split('Bearer ')[1]; //obtain the token’s value
            token = token.substring(7);
            jwt.verify(token, config.JWTKey, function(err, decoded){
                if(err)
                {
                    //key invalid
                    res.status(403);
                    res.send(`{"Message":"Not Authorized"}`);
                }
                
                else
                {
                    req.username = decoded.username;
                    req.role = decoded.role;
                    // next();

                    // Check for admin role
                    if (req.role === "admin")
                    {
                        next();
                    }
                    
                    else
                    {
                        res.status(403);
                        res.send(`{"Message":"Clearance not high enuff!"}`);
                    }
                }

            });
        }
    }
}

var verifyFn = 
{

    verifyToken: function (req, res, next) {

        var token = req.headers['authorization'];

        res.type('json');
        if (!token || !token.includes("Bearer "))
        {

            res.status(403);
            res.send(`{"Message":"Not Authorized"}`);

        } 
        
        else
        {
            //token = token.split('Bearer ')[1]; //obtain the token’s value
            token=token.substring(7);
            jwt.verify(token,config.JWTKey,function(err,decoded)
            {
                if(err)
                {
                    //key invalid
                    res.status(403);
                    res.send(`{"Message":"Not Authorized"}`);
                }
                
                else
                {
                    req.username=decoded.username;
                    req.role=decoded.role;
                    next();
                }

            });
        }

    }
}

module.exports = verifyAdmin;