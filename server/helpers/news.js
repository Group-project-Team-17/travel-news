const axios = require('axios')

const newsAPI = async _ => {
    const newsAPI = await axios({ method: 'GET', url: process.env.PRIVATE_TRAVEL_KEY })
    const allNews = []
    for(let i = 0; i < 10; i++) {
        let obj = {
            title: newsAPI.data.posts[i].thread.title_full,
            imageURL: newsAPI.data.posts[i].thread.main_image,
            postURL: newsAPI.data.posts[i].thread.url,
            publish_date: newsAPI.data.posts[i].thread.published,
            text: newsAPI.data.posts[i].text
        }
        allNews.push(obj)
    }

    return allNews
}

module.exports = newsAPI
// newsAPI() // * Cari 10 Berita