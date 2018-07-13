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
    cnpj: {
        type: String,
        required: false
    },
    razaoSocial: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    tempoEstimado: {
        type: Number,
        required: true
    },
    avaliacao: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    logradouro: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    whatsapp: {
        type: Number,
        required: false
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: false
    },
    categoria: {
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
