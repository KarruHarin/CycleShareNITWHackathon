import e from "express";
import cors from "cors";
import http from "http"
import {Server} from "socket.io"
const app = e();

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

const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"]
  }
});
// Store active connections
const activeUsers = new Map();

io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('register', (userId) => {
        activeUsers.set(socket.id, userId);
    });

    socket.on('updateLocation', async ({ userId, type, coordinates }) => {
        try {
            const location = new Location({
                type,
                userId,
                coordinates
            });
            await location.save();
            
            // Broadcast to all other clients
            socket.broadcast.emit('locationUpdate', {
                userId,
                type,
                coordinates
            });
        } catch (error) {
            console.error('Error saving location:', error);
        }
    });

    socket.on('disconnect', () => {
        activeUsers.delete(socket.id);
    });
});








import userRouter from './routes/user.routes.js';
import cycleRouter from './routes/cycle.routes.js';

app.use("/user",userRouter);
app.use("/cycle",cycleRouter);


export {server}
