
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecasst = require('./utils/forecast')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectorypath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Tanuj'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Section',
        helpText: 'This is a help ful text',
        name: 'Tanuj'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Tanuj'
    })
})

app.get('/weather', (req, res) =>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide a Location!'
        })
    }

    geocode(req.query.address, (error, {lat, long, location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(lat, long, (error, forecastData)=> {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search content'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Tanuj',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tanuj',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is running on Port ' + port)
})
