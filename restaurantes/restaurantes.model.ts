import * as mongoose from 'mongoose'

export interface Produto extends mongoose.Document {
    nome: string,
    valor: number
}


export interface Restaurante extends mongoose.Document {
    nome: string,
    cardapio: Produto[]
}


const cardapioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
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
    cardapio: {
        type: [cardapioSchema],
        required: false,
        select: false,
        default: []
    },
})


export const Restaurante = mongoose.model<Restaurante>('Restaurante', restSchema)
