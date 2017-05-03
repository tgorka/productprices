import * as sourceMapSupport from "source-map-support";
import * as mongoose from "mongoose";
import * as bluebird from "bluebird";
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as mongooseErrorHandler from "mongoose-error-handler";
import * as swaggerUi from "swagger-ui-express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as cors from "cors";
import * as jwt from "express-jwt";
import * as permissions from "express-jwt-permissions";

import config from "./config";
import {RegisterRoutes} from "./generated/routes";

const swaggerDocument = require("./generated/swagger.json");
const staticFilesDir = __dirname + "/dist";

// controllers need to be referenced in order to get crawled by the generator
import "./server/products";
import "./server/prices";

/**
 * The server main class
 */
export class Server {

  /**
   * Express app instance
   */
  public app: express.Application;

  /**
   * Router for api calls
   */
  public apiRouter: express.Router;

  /**
   * Permissions checker.
   */
  public permissions: any;

  /**
   * Bootstrap the application.
   *
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Server constructor. Create and configure expressjs application
   *
   * @constructor
   */
  constructor() {
    // errors thrown with the typescript files not generated js
    sourceMapSupport.install();
    // express app
    this.app = express();
    this.apiRouter = express.Router();
    this.permissions = permissions();
    // configuration
    this.dbConnection();
    this.middleware();
    this.route();
    this.errorHandling();
    this.listen();
  }

  /**
   * Set-up all the middleware libraries.
   */
  public middleware(): void {
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));
    this.app.use(bodyParser.json({limit: "50mb"}));
    this.app.use(morgan("tiny"));
    this.apiRouter.use(cors());
  }

  /**
   * Configure the routes of the application.
   */
  public route(): void {
    // swagger routes
    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.get("/swagger", (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname + "/generated/swagger.json"));
    });
    this.app.use("/api", /*jwt({secret: config.jwt.secret}), this.permissions.check("vls:client"),*/ this.apiRouter);
    // register generated routes
    RegisterRoutes(this.apiRouter);
    // static files
    this.app.use("/", express.static(staticFilesDir));

  }

  /**
   * Raise unhandled exceptions and handle exceptions to the response.
   */
  public errorHandling(): void {
    // raise unhandled exceptions
    process.on("unhandledRejection", r => console.log(r));
    // handle exceptions to the response
    this.app.use((err: any, req: any, res: express.Response, next: express.NextFunction) => {
      if (err.status === 401 || err.status === 403) {
        // auth, permission errors
        res.status(err.status).send({error: err.name, code: err.code, message: err.message});
      } else if (err.name === "ValidationError") {
        // validation errors
        res.status(422).send(mongooseErrorHandler.set(err, req.t)); // req.t for i18n error messages
      } else if (err.status && err.status < 500 && err.status >= 400) {
        // 4xx status
        res.status(err.status).send({error: err.name, code: err.code, message: err.message});
      } else {
        // internal server error
        console.log("ERROR", err.message);
        console.error(err);
        res.status(500).send({error: err.name, message: err.message});
      }
    });
  }

  /**
   * Set-up db connection
   */
  public dbConnection(): void {
    (<any>mongoose).Promise = bluebird;
    mongoose.connect(config.mongo.url);
  }

  /**
   * Listen app trigger os selected configuration.
   */
  public listen(): void {
    this.app.listen(config.server.port, config.server.host, () => {
      console.log(`Magic happens on ${config.server.host}:${config.server.port}`);
    });
  }
}

export default Server.bootstrap();
