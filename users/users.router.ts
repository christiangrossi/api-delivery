import { ModelRouter } from '../common/model-router'
import { User } from './users.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'

class UsersRouter extends ModelRouter<User> {
    private path: string = '/usuarios'
    private pathId: string = this.path + '/:id'

    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
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

export const usersRouter = new UsersRouter()