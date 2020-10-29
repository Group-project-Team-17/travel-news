const axios = require('axios')
const { User } = require('../models/')
const bcrypt = require("../helpers/bcrypt")
const jwt = require("../helpers/jwt")

class OauthController {
    static async github(req, res, next) {
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

module.exports = OauthController