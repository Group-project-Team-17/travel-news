const bcrypt = require('bcryptjs')
//Encrypt Password
const encryptPassword = userPassword => {
    const salt = bcrypt.genSaltSync(+process.env.PRIVATE_HASH_SYNC)
    const hash = bcrypt.hashSync(userPassword, salt)

    return hash
}
//Decrypt Password
const checkPassword = (plainPass,encryptPass) => {
    return bcrypt.compareSync(plainPass, encryptPass)
}

module.exports = { encryptPassword, checkPassword }