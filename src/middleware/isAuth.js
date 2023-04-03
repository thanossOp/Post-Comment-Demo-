
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
