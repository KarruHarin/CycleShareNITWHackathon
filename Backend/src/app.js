import e from "express";
import cors from "cors";
import http from "http"
import {Server} from "socket.io"
const app = e();
import SocketService from "./services/socket.service.js";

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization']
}));

app.use(e.json({limit:"32kb"}));
app.use(e.urlencoded({limit:"32kb",extended:true}));

const server = http.createServer(app)

const socketService = new SocketService(server);









import userRouter from './routes/user.routes.js';
import cycleRouter from './routes/cycle.routes.js';
import bookingRouter from './routes/booking.routes.js'

app.use("/user",userRouter);
app.use("/cycle",cycleRouter);
app.use("/booking",bookingRouter)


export {server,app,socketService}
