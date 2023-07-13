const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://127.0.0.1:27017/personsRelationship', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
if(!connection){
    console.log('connection failed')
}
console.log('connection succeed')