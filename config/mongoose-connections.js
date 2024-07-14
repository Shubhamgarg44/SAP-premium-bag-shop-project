const { Db } = require('mongodb');
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/SAP-Luxe-Bags').then(function(){
    console.log('connected to database')
}).catch(function(err){
    console.log(err)
})

module.exports = mongoose.connection;