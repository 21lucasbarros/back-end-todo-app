const mongoose = require('mongoose');

const schemaPartidas = new mongoose.Schema({
    time1: {
        required: true,
        type: String
    },
    time2: {
        required: true,
        type: String
    },
    placar: {
        required: true,
        type: String
    },
},
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Partida', schemaPartidas, '2004')
