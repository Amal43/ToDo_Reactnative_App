import express ,{Express,Request,Response} from "express";
import config from './config';
import http from 'http';
import errorhandler from '../src/middleware/errorHandler';
const app:Express = express();
const server = http.createServer(app);
import authRoute from './Routes/authRoute';
import todoRoute from './Routes/todoRoute';

app.use((express.json({ limit: "30mb"})));
app.use((express.urlencoded({ limit: "30mb", extended: true})));


app.use('/auth',authRoute);
app.use('/todo',todoRoute);
app.use(errorhandler);

// SETUP CONNECTION
config.connect();
server.listen(config.port, () => {
    console.log(`ToDo app listening on port ${config.port}!`)
});
