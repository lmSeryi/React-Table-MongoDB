const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')

const routes = require('./routes/task.routes')
const { mongoose } = require('./database')

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/tasks',routes)

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

