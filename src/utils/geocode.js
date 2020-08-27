const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGljY2EtdGFudWpzYWluaSIsImEiOiJja2U4NW91aXkwaWtnMnFybnBhYWg5NmY2In0.uR1PjvbX7Hz-tnd_XnTHHQ&limit=1'

    request({ url, json: true }, (error, { body}) => {
        if (error) {
            callback('Could Not Connect to Geo Location Server!', undefined)
        } else if (body.features.length === 0) {
            callback('No Place Found! Try another Search.', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geoCode