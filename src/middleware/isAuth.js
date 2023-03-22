
const passport = require('passport');

function isAuth(roles) {
    return  function (req, res, next) {
        // const verify = jwt.verify(token, process.env.SECRET_KEY)
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({
                    status: 401,
                    message: "Unauthorized User"
                })
            } else {

                if (!roles || (!Array.isArray(roles) && roles == user.role)) {
                    req.user = user
                    return next()
                }
                if (roles.includes(user.role)) {
                    req.user = user
                    return next()
                }
                res.status(401).json({
                    status:401,
                    message : "You are Not authorized"
                })
            }
        })(req,res,next)


    }
}
module.exports = isAuth;




// const jwt = require('jsonwebtoken')
// const passport = require('passport');
// const { messages } = require('../validation/registervalidation');
// const User = require('../model/usermodel')


// async function isAuth(req, res, next) {
//     const cookie = req.cookies.authcookie
//     const verify = jwt.verify(cookie, process.env.SECRET_KEY)
//     const useremail = await User.findOne({ Email: verify.Email })


//     if (verify) {
//         req.user = useremail
//         next()
//     } else {
//         res.json({
//             status: 401,
//             messages: "User is not valid"
//         })
//     }

// }

// module.exports = isAuth;

