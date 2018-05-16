import * as mongoose from 'mongoose'
import { validateCPF } from '../common/validators'
import * as bcrypt from 'bcrypt'
import { environment } from '../common/environment'


export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    cpf: string
}

const userSchema = new mongoose.Schema({
    name: {
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
    gender: {
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
    bcrypt.hash(obj.getUpdate().password, environment.security.saltRounds).then(hash => {
        obj.password = hash
        next()
    }).catch(next)
}

/**
 * Filtro de save
 * 
 * @param next 
 */
// nao user arrow function  pois nao conseguiriamos pegar this dinamicamente
const saveMiddleware = function (next) {
    const user: any = this
    if (!user.isModified('password')) {
        next()
    } else {
        hashPassword(user, next)
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


// nao user arrow function  pois nao conseguiriamos pegar this dinamicamente
userSchema.pre('save', saveMiddleware)
userSchema.pre('FindOneAndUpdate', updateMiddleware)
userSchema.pre('update', updateMiddleware)


//ele ja identifica o plural
export const User = mongoose.model('User', userSchema)
