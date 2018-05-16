"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const cardapioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: false
    },
    valor: {
        type: Number,
        required: true
    },
});
const restSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: false
    },
    cardapio: {
        type: [cardapioSchema],
        required: false,
        select: false,
        default: []
    },
});
exports.Restaurante = mongoose.model('Restaurante', restSchema);
