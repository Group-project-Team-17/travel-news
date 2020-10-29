const { User } = require('../models/')
const bcrypt = require("../helpers/bcrypt")
const jwt = require("../helpers/jwt")

class UserController {
    static async postRegisterUser(req, res, next) {
        try {
            const newUser = {
                full_name: req.body.full_name,
                email: req.body.email,
                password: req.body.password
            }
            const createUser = await User.create(newUser)

            res.status(200).json({ id: createUser.id, email: createUser.email })
        } catch (error) {
            next(error)
        }
    }

    static async postLoginUser(req, res, next) {
        try {
            const userEmail = req.body.email
            const userPassword = req.body.password
            const userLogin = await User.findOne({ where: { email: userEmail }})
            //Cek apakah user ada atau tidak
            if(userLogin){
                //Decrypt password dari hasil findOne
                const pass = bcrypt.checkPassword(userPassword,userLogin.password)
                //Cek password benar atau tidak
                if(pass){
                    let accessToken = jwt.signToken({id:userLogin.id,email:userLogin.email})
                    res.status(200).json({accessToken})
                }else{
                    throw {name:'Email atau Password salah'}
                }
            }else{
                throw {name:'Email atau Password salah'}
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController