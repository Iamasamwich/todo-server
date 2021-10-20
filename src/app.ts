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
  secret: 'backflips are for crickets',
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
  'http://localhost:3001'
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