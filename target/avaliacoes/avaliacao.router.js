"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const avaliacao_model_1 = require("./avaliacao.model");
class AvaliacaoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(avaliacao_model_1.Avaliacao);
        this.path = '/avaliacoes';
        this.pathId = this.path + '/:id';
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
    prepareOne(query) {
        return query.populate('usuario', 'nome')
            .populate('restaurante', 'nome');
    }
    applyRoutes(application) {
        application.get(this.path, this.findAll);
        application.get(this.pathId, [this.validateId, this.findById]);
        application.post(this.path, this.save);
    }
}
exports.avaliacaRouter = new AvaliacaoRouter();
