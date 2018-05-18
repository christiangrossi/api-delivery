import { ModelRouter } from '../common/model-router'
import { Avaliacao } from './avaliacao.model'
import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors'


class AvaliacaoRouter extends ModelRouter<Avaliacao>{
    private path: string = '/avaliacoes'
    private pathId: string = this.path + '/:id'

    constructor() {
        super(Avaliacao)
    }
    /**
     * Override realizado nesse ponto
     */
    // findById = (req, resp, next) => {
    //     this.model.findById(req.params.id)
    //         .populate('usuario', 'nome')
    //         .populate('restaurante', 'nome')
    //         .then(this.render(resp, next)).catch(next)
    // }


    protected prepareOne(query: mongoose.DocumentQuery<Avaliacao, Avaliacao>) {
        return query.populate('usuario', 'nome')
            .populate('restaurante', 'nome');
    }


    applyRoutes(application: restify.Server) {
        application.get(this.path, this.findAll)
        application.get(this.pathId, [this.validateId, this.findById])
        application.post(this.path, this.save)
    }
}
export const avaliacaRouter = new AvaliacaoRouter();