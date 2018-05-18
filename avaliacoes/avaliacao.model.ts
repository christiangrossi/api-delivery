import * as mongoose from 'mongoose';
import { Restaurante } from '../restaurantes/restaurantes.model';
import { Usuario } from '../usuarios/usuario.model';

export interface Avaliacao extends mongoose.Document {
    data: Date,
    classificacao: number,
    comentarios: string,
    restaurante: mongoose.Types.ObjectId | Restaurante,
    usuario: mongoose.Types.ObjectId | Usuario
}



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
})
export const Avaliacao = mongoose.model<Avaliacao>('Avaliacao', avaliacaoSchema)