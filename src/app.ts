import express from "express";
import morgan from "morgan";
import { swaggerDocs } from './config/swagger';
import router from "./routes/index.route";
import { errorHandler } from "./middlewares/error.handeler";

const app = express();
//Middlewares globais
app.use(morgan('dev'));
app.use(express.json());

//Documentação Swagger
swaggerDocs(app);

//Rotas da aplicação
app.use('/api/v1', router);

//Middleware global de erros (sempre por último)
app.use(errorHandler);

export default app;

