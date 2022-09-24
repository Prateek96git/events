const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
      let token = req.signedCookies.loginToken;

      if (!token)
         return res.status(400).json({ msg: "Session ended, Login again."})

       await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            // res.json({ user })
            req.user = user
            next()
       })  
}

module.exports = auth;