const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const path = require('path');
const router = require('./router');

const appEnv = process.env.ENVIRONMENT;

const app = express();

app.use(express.static(path.join(__dirname, '..')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json({ limit: '50mb' }));
if (appEnv === 'development') { app.use(morgan('dev')); }
app.use(router);

const port = process.env.PORT || 3001;

app.listen(port);

module.exports = app;
