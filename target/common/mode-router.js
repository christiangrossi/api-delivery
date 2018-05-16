"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.findAll = (req, resp, next) => {
            this.model.findById(req.params.id)
                .then(this.render(resp, next)).catch(next);
        };
    }
}
exports.ModelRouter = ModelRouter;