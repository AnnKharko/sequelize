const express = require('express');
const fileUpload = require('express-fileupload');
const db = require('./dataBase').getInstance();
const Sentry = require('./logger/sentry');

db.setModels();

const { apiRouter } = require('./router');

const app = express();

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
