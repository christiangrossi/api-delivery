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

    findCardapio = (req, resp, next) => {
        Restaurante.findById(req.params.id, "+cardapio").then(
            rest => {
                if (!rest) {
                    throw new NotFoundError('Restaurante não encontrado')
                } else {
                    resp.json(rest.cardapio)
                    return next()
                }
            }).catch(next)
    }

    replaceCardapio = (req, resp, next) => {
        Restaurante.findById(req.params.id).then(rest => {
            if (!rest) {
                throw new NotFoundError('Restaurante não encontrado')
            } else {
                rest.cardapio = req.body
                return rest.save()
            }
        }).then(rest => {
            resp.json(rest.menu)
        }).catch(next)
    }


    findWithParameters = (req, resp, next) => {
        let parameters = req.query;
        if (parameters == undefined || parameters == null) {
            Restaurante.findAll(req, resp, next);
        } else {
            Restaurante.find({ 'nome': { $regex: parameters.nome, $options: 'i' } }).then(this.renderAll(resp, next)).catch(next);
        }
    }

    applyRoutes(application: restify.Server) {
        application.get(this.path, this.findWithParameters)
        application.get(this.pathId, [this.validateId, this.findById])
        application.post(this.path, this.save)
        application.put(this.pathId, [this.validateId, this.replace])
        application.patch(this.pathId, [this.validateId, this.update])
        application.del(this.pathId, [this.validateId, this.delete])

        application.get(this.pathId + '/cardapio', [this.validateId, this.findCardapio])
        application.put(this.pathId + '/cardapio', [this.validateId, this.replaceCardapio])
    }
}

export const restaurantesRouter = new RestaurantesRouter()