import { ModelRouter } from '../common/model-router'
import { Avaliacao } from './avaliacao.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'


class AvaliacaoRouter extends ModelRouter<Avaliacao>{
    private path: string = '/avaliacao'
    private pathId: string = this.path + '/:id'

    constructor() {
        super(Avaliacao)
    }

    applyRoutes(application: restify.Server) {
        application.get(this.path, this.findAll)
        application.get(this.pathId, [this.validateId, this.findById])
        application.post(this.path, this.save)
        application.put(this.pathId, [this.validateId, this.replace])
        application.patch(this.pathId, [this.validateId, this.update])
        application.del(this.pathId, [this.validateId, this.delete])
    }

}