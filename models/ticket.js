
const mongoose = require('mongoose');
const config = require('../config/database');


var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

//Course Schema
let ticketSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    price: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    
});
ticketSchema.plugin(uniqueValidator, { message: 'Error, expected to be unique.'})
module.exports = mongoose.model('Ticket', ticketSchema);








