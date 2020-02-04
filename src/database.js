const mongoose = require('mongoose')
const URI = 'mongodb://localhost:27017/mern-task'

mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(db => console.log('connected to DB'))
    .catch(err => console.error(err))

module.exports = mongoose

