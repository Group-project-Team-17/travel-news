const { User } = require('../models/')
const bcrypt = require("../helpers/bcrypt")
const jwt = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');

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

    static async googleLogin(req,res,next){
        const {google_token} = req.body
        const client = new OAuth2Client(process.env.PRIVATE_GOOGLE_CLIENT);
            try {
                const ticket = await client.verifyIdToken({
                    idToken: google_token,
                    audience: process.env.PRIVATE_GOOGLE_CLIENT,
                });
                const payload = ticket.getPayload();
                const email = payload.email
                const full_name = payload.name
                const available = await User.findOne({where:{email}})
                if(available){
                    let accessToken = jwt.signToken({id:available.id,email:available.email})
                    res.status(200).json({accessToken})
                }else{
                    const newUser = await User.create({
                        full_name,
                        email,
                        password : process.env.PRIVATE_DEFAULT_PASSWORD
                    })
                    let accessToken = jwt.signToken({id:newUser.id,email:newUser.email})
                    res.status(200).json({accessToken})
                }
            } catch (err) {
                next(err);
        } 
    }
}

module.exports = UserController