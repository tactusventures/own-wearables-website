import express from 'express';
import { APP_PORT, MONGO_URL } from './config';
import router from './routes/api';
import errorHandler from './middlewares/errorHandler';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session'; 
import { SESSION_SECRET } from './config';
import passport from 'passport';
import initPassport from './config/passport';
import cors from 'cors';
import adminRouter from './routes/web';
import expressEjsLayouts from 'express-ejs-layouts';
import flash from 'express-flash'; 
import http from 'http';
import init from './services/admin/passportService';


// const MongoDbStore = require('connect-mongo'); 
import MongoDbStore from 'connect-mongo'; 

mongoose.connect(MONGO_URL).then(() => {
    console.log('connected'); 
}).catch((e) => {
    console.log(e);
}); 

let corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true,
}



const app = express();
app.use(cookieParser()); 
const server = http.createServer(app); 
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
}); 


app.use(cors(corsOptions));


// configuring session
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, 
    store: MongoDbStore.create({mongoUrl: MONGO_URL})
}));

app.use(flash()); 


// passport configuration
initPassport(passport);
init(passport); 
app.use(passport.initialize()); 
app.use(passport.session()); 

const setNoCacheHeaders = (req, res, next) => {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.setHeader('Expires', '0');
    res.setHeader('Pragma', 'no-cache');
    next();
  };


// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next(); 
});

app.use(setNoCacheHeaders); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public')); 
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set("layout", 'layouts/layout'); 
app.use('/api', router);
app.use(adminRouter);



app.use(errorHandler);

const PORT = APP_PORT || 3001;

server.listen(PORT, () => {
    console.log(`server has been started on Port ${PORT}`); 
});