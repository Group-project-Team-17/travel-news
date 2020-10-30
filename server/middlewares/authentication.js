//Fitur Authentikasi
const {User} = require("../models")
const jwt = require("../helpers/jwt")

class Auth {
    static async authentication(req, res, next){
        try {
            const {accesstoken} = req.headers
            if(!accesstoken){
                throw {name : 'You dont have access'}
            }else{
                const decode = jwt.verifyToken(accesstoken)
                const user = await User.findByPk(decode.id)
                if(!user){
                    throw {name : 'You dont have access'}
                }else{
                    req.userLogin = decode
                    next()
                }
                
            }
            
        } catch (err) {
            next(err)
        }
    }
}


module.exports = Auth