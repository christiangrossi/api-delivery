"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const restaurantes_model_1 = require("./restaurantes.model");
class RestaurantesRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurantes_model_1.Restaurante);
        this.path = '/restaurantes';
        this.pathId = this.path + '/:id';
    }
    applyRoutes(application) {
        application.get('/restaurantes', this.findAll);
        application.get(this.pathId, [this.validateId, this.findById]);
        application.post(this.path, this.save);
        application.put(this.pathId, [this.validateId, this.replace]);
        application.patch(this.pathId, [this.validateId, this.update]);
        application.del(this.pathId, [this.validateId, this.delete]);
    }
}
exports.restaurantesRouter = new RestaurantesRouter();
