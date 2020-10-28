const errStatusJoin = require('../helpers/errstatusjoin')

module.exports = (err, req, res, next) => {

    const errName = err.name
    const errErrors = err.errors

    let message = 'Internal Server Error'
    let status = 500

    // * Default Sequelize Error Message
    const uniqueErr = `SequelizeUniqueConstraintError`
    const validationErr = `SequelizeValidationError`

    // * Custom Error Message
    const loginErr = `Email atau Password salah`

    //Custom Auth Error Message
    const authErr = 'You dont have access'

    switch(errName) {
        case uniqueErr:
            message = errStatusJoin(errErrors)
            status = 400
            break
        case validationErr:
            message = errStatusJoin(errErrors)
            status = 400
            break
        case loginErr:
            message = loginErr
            status = 401
            break
        case authErr:
            message = authErr
            status = 403
            break
    }

    res.status(status).json({ msg: message })
}