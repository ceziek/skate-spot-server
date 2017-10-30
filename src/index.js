import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';

import user from './endpoints/user';
import spots from './endpoints/spots';

import api from './middleware/api';
import session from './middleware/session';

import config from './config.json';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.use(cors({credentials: true, origin: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to db
initializeDb(db => {
    app.use(session());
    app.use(api());
    app.use('/', user({config, db}));
    app.use('/api/spots', spots({config, db}));

    app.server.listen(process.env.PORT || config.port, () => {
        console.log(`Started on port ${app.server.address().port}`);
    });
});

export default app;