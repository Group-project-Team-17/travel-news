const jwt = require("jsonwebtoken")

function signToken(payload){
    const token = jwt.sign(payload,process.env.PRIVATE_JWT_SECRET)
    return token
}
function verifyToken(token){
    const decoded = jwt.verify(token,process.env.PRIVATE_JWT_SECRET)
    return decoded
}

module.exports = {
    signToken,
    verifyToken
}