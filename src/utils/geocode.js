const request = require('postman-request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2VvcmdlMTk5OCIsImEiOiJjazdycW02MnMwN2VlM2ZuMXBuY2JtaHE2In0.U3Xqynwhs8Z59ZH0WJjNiA&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location.Try another search')

        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode