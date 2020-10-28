const newsAPI = require('../helpers/news')
const weatherAPI = require('../helpers/weather-ip')

class NewsController {
    static showAll = async (req, res, next) => {
        try {
            const berita = await newsAPI()
            const cuaca = await weatherAPI()

            res.status(200).json({ berita, cuaca })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = NewsController