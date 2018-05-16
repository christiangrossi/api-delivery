"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.path = '/usuarios';
        this.pathId = this.path + '/:id';
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get(this.path, this.findAll);
        application.get(this.pathId, [this.validateId, this.findById]);
        application.post(this.path, this.save);
        application.put(this.pathId, [this.validateId, this.replace]);
        application.patch(this.pathId, [this.validateId, this.update]);
        application.del(this.pathId, [this.validateId, this.delete]);
    }
}
exports.usersRouter = new UsersRouter();
