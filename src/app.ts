import express from 'express';
import session from 'express-session';
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
  console.log(req.session.id);
  next();
});

app.use(express.static('public'));

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});