const { User } = require('../models/')

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
            if (!userLogin) {
                throw { name: 'Email atau Password salah' }
            } else {
                if (userPassword == userLogin.password) {
                    res.status(200).json({ userLogin })
                } else {
                    throw { name: 'Email atau Password salah' }
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController