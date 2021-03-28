const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require('path');
const Sentry = require('./logger/sentry');

const { apiRouter } = require('./router');
const db = require('./dataBase').getInstance();

db.setModels();

const app = express();

dotenv.config({ path: path.join(process.cwd(), '.env') });
// { path: path.join(process.cwd(), './.env') }

app.use(Sentry.Handlers.requestHandler());

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.use(Sentry.Handlers.errorHandler());

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    Sentry.captureException(err);
    res
        .status(err.status || 500)
        .json({
            code: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(5001, () => {
    console.log('App listen 5001');
});
