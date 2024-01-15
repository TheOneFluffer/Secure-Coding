var validator = require('validator');

var validationFn = 
{

    validateRegister: function (req, res, next)
    {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        var usernameRegex = /[A-Za-z\s',]/;
        var emailRegex = /^[A-Za-z0-9]^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,}/;

        if (!usernameRegex.test(username))
        {
            if (!emailRegex.test(email))
            {
                if (!passwordRegex.test(password))
                {
                    return res.status(500).json({ error: 'Invalid username/email/password! Please try again'});
                }
            }
        }
    },

    validateUserid: function (req, res, next)
    {
        var userid = req.body.userid;

        var useridRegex = /[\d]/;

        if (!useridRegex.test(userid))
        {
            return res.status(500).json({ error: 'Invalid userid, Please try again'});
        }


    },

    sanitizeResult: function (result)
    {

        function sanitizeString(str) {
            // Your sanitize logic here
            str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
            return str.trim();
        }

        for (i = 0; i < result.length; i++)
        {
            var row = sanitizeString(result[i]);
            console.log('Sanitized Result:', sanitizedResult);
        }
    }
}

module.exports = validationFn;