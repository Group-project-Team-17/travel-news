const axios = require('axios')

const weatherAPI = async _ => {
    const getIP = await axios({ method: 'GET', url: process.env.PRIV_IPAPI_KEY})

    const cuaca = await axios({
        method: 'GET',
        url: `${process.env.PRIV_WEATHER_API_URL}?lat=${getIP.data.latitude}&lon=${getIP.data.longitude}&exclude=minutely,hourly&appid=${process.env.PRIV_WEATHER_KEY}`
    })

    return cuaca.data
}

module.exports = weatherAPI