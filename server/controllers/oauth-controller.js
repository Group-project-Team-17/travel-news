const axios = require('axios')

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

            // ! Convert Ke JSON WEB TOKEN

            res.status(200).json({ data: getResult.data }) // ! Balikin yg udah ke convert berisi email sama nama lengkap
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OauthController