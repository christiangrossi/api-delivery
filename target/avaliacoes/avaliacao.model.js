"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const avaliacaoSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true,
    },
    classificacao: {
        type: Number,
        required: true
    },
    comentarios: {
        type: String,
        required: true,
        maxLenght: 400
    },
    restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurante',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});
exports.Avaliacao = mongoose.model('Avaliacao', avaliacaoSchema);
