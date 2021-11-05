import express from 'express';
import session from 'express-session';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    loggedIn?: boolean;
  }
};

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.COOKIE as string,
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: false,
    secure: false,
    maxAge: 12096000000
  }
}));

app.use((req, res, next) => {
  console.log('source', req.ip);
  console.log('method', req.method);
  console.log('route', req.path);
  console.log('session id', req.session.id);
  next();
});

const whiteListOrigins : Array<string | undefined> = [
  'http://things-to-do-todo-app.herokuapp.com',
  'https://things-to-do-todo-app.herokuapp.com',
  'http://localhost:3000', //app in browser
  'http://localhost:3001', //client app in browser
  'http://192.168.43.5:3001', //open on phone
  `http://${process.env.HOST}:${process.env.PORT}`, //for prod
  `http://${process.env.HOST}`,
  undefined
];

app.use(cors({
  origin: (origin, callback) => {
    if (whiteListOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('unacceptable origin --->', origin);
      callback(new Error('unacceptable origin: ' + origin));
    };
  },
  credentials: true
}));

app.use(express.static('public'));

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});