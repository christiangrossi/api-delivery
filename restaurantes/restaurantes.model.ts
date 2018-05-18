import * as mongoose from 'mongoose'

export interface Produto extends mongoose.Document {
    nome: string,
    imagePath: string,
    valor: number
}


export interface Restaurante extends mongoose.Document {
    nome: string,
    descricao: string,
    categoria: string,
    tempoEstimado: string,
    avaliacao: number,
    imagePath: string,
    cardapio: Produto[]
}

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
})

const restSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
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
    tempoEstimado: {
        type: String,
        required: false
    },
    avaliacao: {
        type: Number,
        required: false
    },
    cardapio: {
        type: [cardapioSchema],
        required: false,
        select: false,
        default: []
    },
})


export const Restaurante = mongoose.model<Restaurante>('Restaurante', restSchema)
