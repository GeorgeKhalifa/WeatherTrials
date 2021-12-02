const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//heroku sets environment variable
const port = process.env.PORT || 3000

//define paths for express to config

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//get handle bars set up
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//function describe what to send when someone access this route
//incoming request ,//response, what we send back to requester

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'LOX',
    })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'about', name: 'Geo' })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'HelpGEORGE'
    })
})




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: "You must provide an address"
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({ location, forecastData })
        })

    })
    // console.log(req.query.address)
    // res.send({
    //     address: req.query.address,
    //     forecast: 'it is raining',
    //     location: 'Cairo'
    // })
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: 'Error page in help',
        name: 'HelpGEororo',
        message: 'article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not exist 404',
        name: 'LOLLLL',
        message: "not existing"

    })
})


//locally, but cant for heroku
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


//all are gonna run on same express application server
//app.com
//app.com/help
//app.com/about

