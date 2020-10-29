const { User } = require('../models/')
const bcrypt = require("../helpers/bcrypt")
const jwt = require("../helpers/jwt")
const axios = require('axios')

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
            //Decrypt password dari hasil findOne
            const pass = bcrypt.checkPassword(userPassword,userLogin.password)
            //Jika userLogin dan hasil decrypt true maka akan generate token jwt
            if(userLogin && pass){
                let accessToken = jwt.signToken({id:userLogin.id,email:userLogin.email})
                res.status(200).json({accessToken})
            }else{
                throw {name:'Email atau Password salah'}
            }
        } catch (error) {
            next(error)
        }
    }

    static async githubLogin(req, res, next) {
        try {
            const requestToken = req.query.code
            const getAccessToken = await axios({
                method: 'POST',
                url: `${process.env.PRIV8_GITHUB_OAUTH_URL}?client_id=${process.env.PRIV8_GITHUB_CLIENT_ID}&client_secret=${process.env.PRIV8_GITHUB_CLIENT_SECRET}&code=${requestToken}`,
            })
            
            const accessToken = getAccessToken.data.substring(getAccessToken.data.indexOf('=') + 1, getAccessToken.data.indexOf('&'))
                

            const getResult = await axios({
                method: 'GET',
                url: 'https://api.github.com/user',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            const githubExistUser = {
                email: getResult.data.email,
                password: getResult.data.node_id.substring(0, 15)
            }
            const githubNewUser = {
                email: getResult.data.email,
                password: getResult.data.node_id.substring(0, 15),
                full_name: getResult.data.name
            }

            const findUser = await User.findOne({ where: { email: githubExistUser.email }})
            if (findUser) {
                const pass = bcrypt.checkPassword(githubExistUser.password, findUser.password)
                if (pass) {
                    const accessToken = jwt.signToken({ email: findUser.email, full_name: findUser.full_name })
                    res.status(200).json({ accessToken }) // * Kalo user nya ketemu, buat access Token yang berisi email + full_name
                }
            } else {
                const createUser = await User.create(githubNewUser)
                const accessToken = jwt.signToken({ email: createUser.email, full_name: createUser.full_name })
                res.status(200).json({ accessToken }) // * Kalo user nya belum ketemu, buat access Token yang berisi email + full_name
            }

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController