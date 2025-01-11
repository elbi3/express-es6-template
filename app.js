//http imported in bin/www
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import express from 'express';

//to get cross-platform absolute valid paths strings for view engine setup:
import { fileURLToPath } from "node:url";
import path from 'node:path';

//middlewares no longer on the Express object (moving from Express 3 to Express 4):
import bodyParser from "body-parser";
//errorHandler
import favicon from "serve-favicon";
import logger from 'morgan';
import methodOverride from "method-override";
import multer from "multer";
import session from "express-session";

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import errorHandler from "errorhandler"; //load this after loading the app routes! (is this only for Express 3?)

const app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "uwotm8" //nice
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
