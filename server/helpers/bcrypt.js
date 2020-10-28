const bcrypt = require('bcryptjs')

const encryptPassword = userPassword => {
    const salt = bcrypt.genSaltSync(+process.env.PRIVATE_HASH_SYNC)
    const hash = bcrypt.hashSync(userPassword, process.env.PRIVATE_SECRET_KEY)

    return hash
}

const checkPassword = userPassword => {
    return bcrypt.compareSync(userPassword, process.env.PRIVATE_HASH_SYNC)
}

module.exports = { encryptPassword, checkPassword }