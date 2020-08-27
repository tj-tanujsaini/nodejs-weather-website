const request = require('request')


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dd9024d865565437a7d4cf1f188444dc&query=' + lat + ',' + long

    request({ url, json: true }, (error, { body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const weather = body.current.weather_descriptions[0] + '. It is currently '
                + body.current.temperature + ' degrees out. It feels like '
                + body.current.feelslike + ' degree out.'
            callback(undefined, weather)
        }
    })

}

module.exports = forecast