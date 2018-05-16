import { ModelRouter } from '../common/model-router'
import { Restaurante } from './restaurantes.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'

class RestaurantesRouter extends ModelRouter<Restaurante> {
    private path: string = '/restaurantes'
    private pathId: string = this.path + '/:id'

    constructor() {
        super(Restaurante)
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

export const restaurantesRouter = new RestaurantesRouter()