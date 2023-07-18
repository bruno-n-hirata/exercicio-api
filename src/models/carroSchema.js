const mongoose = require("mongoose");

const carroSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('carro', carroSchema);
