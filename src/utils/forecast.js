const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1e24d9b96f0e846d78b46ff631a78f14&query=' + (latitude).toString() + ',' + (longitude).toString() + '&units=m'
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Website',undefined)
        }
        else if (body.error) {
            callback(body.error.info,undefined)

        }else{
            callback(undefined,{
                weather_descriptions:body.current.weather_descriptions[0],
                tempreature:body.current.temperature,
                precip:body.current.precip
            })
        }

    })
}


module.exports = forecast