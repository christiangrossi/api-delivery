import * as mongoose from 'mongoose'
import { validateCPF } from '../common/validators'
import * as bcrypt from 'bcrypt'
import { environment } from '../common/environment'


export interface Usuario extends mongoose.Document {
    nome: string,
    email: string,
    password: string,
    cpf: string
}

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    }, email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    }, password: {
        type: String,
        select: false,
        required: true
    },
    genero: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validateCPF,
            message: `{PATH}: Cpf Inválido ({VALUE})`
        }
    }
})

const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment.security.saltRounds).then(hash => {
        obj.password = hash
        next()
    }).catch(next)
}

/**
 * Filtro de save
 * 
 * @param next 
 */
// nao Usuario arrow function  pois nao conseguiriamos pegar this dinamicamente
const saveMiddleware = function (next) {
    const usuario: any = this
    if (!usuario.isModified('password')) {
        next()
    } else {
        hashPassword(usuario, next)
    }
}


/**
 * Filtro de update 
 * que verifica password
 * @param next 
 */
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next()
    } else {
        hashPassword(this.getUpdate(), next)
    }
}


// nao usuario arrow function  pois nao conseguiriamos pegar this dinamicamente
usuarioSchema.pre('save', saveMiddleware)
usuarioSchema.pre('FindOneAndUpdate', updateMiddleware)
usuarioSchema.pre('update', updateMiddleware)


//ele ja identifica o plural
export const Usuario = mongoose.model('Usuario', usuarioSchema)
