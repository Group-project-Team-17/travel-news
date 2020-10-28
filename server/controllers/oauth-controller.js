const axios = require('axios')

class OauthController {
    static async github(req, res, next) {
        try {
            const requestToken = req.query.code
            const getAccessToken = await axios({
                method: 'post',
                url: `https://github.com/login/oauth/access_token?client_id=c479c6b7eaaad9a3ea00&client_secret=178d2d17b59b68935b8d2c87c4ad666f831f35df&code=${requestToken}`,
            })
            
            const accessToken = getAccessToken.data.substring(getAccessToken.data.indexOf('=') + 1, getAccessToken.data.indexOf('&'))
                

            const getResult = await axios({
                url: 'https://api.github.com/user',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            // ! Convert Ke JSON WEB TOKEN

            res.status(200).json({ data: getResult.data }) // ! Balikin yg udah ke convert berisi email sama nama lengkap
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OauthController