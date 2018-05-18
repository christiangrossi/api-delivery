"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const restaurantes_model_1 = require("./restaurantes.model");
const restify_errors_1 = require("restify-errors");
class RestaurantesRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurantes_model_1.Restaurante);
        this.path = '/restaurantes';
        this.pathId = this.path + '/:id';
        this.findCardapio = (req, resp, next) => {
            restaurantes_model_1.Restaurante.findById(req.params.id, "+cardapio").then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurante não encontrado');
                }
                else {
                    resp.json(rest.cardapio);
                    return next();
                }
            }).catch(next);
        };
        this.replaceCardapio = (req, resp, next) => {
            restaurantes_model_1.Restaurante.findById(req.params.id).then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurante não encontrado');
                }
                else {
                    rest.cardapio = req.body;
                    return rest.save();
                }
            }).then(rest => {
                resp.json(rest.menu);
            }).catch(next);
        };
    }
    applyRoutes(application) {
        application.get(this.path, this.findAll);
        application.get(this.pathId, [this.validateId, this.findById]);
        application.post(this.path, this.save);
        application.put(this.pathId, [this.validateId, this.replace]);
        application.patch(this.pathId, [this.validateId, this.update]);
        application.del(this.pathId, [this.validateId, this.delete]);
        application.get(this.pathId + '/cardapio', [this.validateId, this.findCardapio]);
        application.put(this.pathId + '/cardapio', [this.validateId, this.replaceCardapio]);
    }
}
exports.restaurantesRouter = new RestaurantesRouter();
