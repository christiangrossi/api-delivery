import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { environment } from '../common/environment';
import { Router } from '../common/router'
import { mergePatchBodyParser } from './merge-patch.parser'
import { handleError } from './error.handler'
import * as corsMiddleware from 'restify-cors-middleware'

export class Server {

    application: restify.Server

    initializeDb() {
        (<any>mongoose.Promise) = global.Promise
        return mongoose.connect(environment.db.url)

    }


    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'delivery-api',
                    version: '1.0.0'
                })

                /**
                 * Cors Configuration
                 * 
                  origins:['http://localhost:4200',]
                    allowHeaders:['authorization']
                    exposeHeaders:['x-custom-header']
                 */
                const corsOption: corsMiddleware.Options = {
                    preflightMaxAge: 86400,
                    origins: ['*'],
                    allowHeaders: ['*'],
                    exposeHeaders: ['*']
                }

                const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOption);

                this.application.pre(cors.preflight)


                //responde req normais
                this.application.pre(cors.actual)
                //plugin do restify para exibir os parametros
                this.application.use(restify.plugins.queryParser());
                //fazendo o parser do req body
                this.application.use(restify.plugins.bodyParser());
                //parser path+
                this.application.use(mergePatchBodyParser)


                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                //teste barrando requisicoes com i.e7
                this.application.get('/info', [(req, resp, next) => {

                    if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
                        //  resp.status(400)
                        //resp.json({message:'Internet explorer 7 nao é suportador'})
                        let error: any = new Error();
                        error.statusCode = 400;
                        error.message = 'Internet explorer 7 nao suportado';
                        //return next(false);
                        return next(error);
                    }


                    return next();
                }, (req, resp, next) => {
                    //resp.contentType='application/json';
                    //resp.setHeader('Content-type','application/json')
                    //resp.send({ message: 'hello ' })
                    //   resp.status(200)
                    resp.json({
                        browser: req.userAgent(),
                        method: req.method,
                        url: req.href(),
                        path: req.path(),
                        query: req.query
                    })
                    return next();
                }])

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)

                })

                this.application.on('restifyError', handleError)

            } catch (error) {
                reject(error);
            }
        })
    }


    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() =>
            this.initRoutes(routers).then(() => this));
    }

}