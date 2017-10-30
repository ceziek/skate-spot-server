import mongoose from 'mongoose';
import config from './config.json';

export default callback => {
    mongoose.Promise = global.Promise;
    let connection = mongoose.createConnection(`mongodb://${config.db.user}:${config.db.password}@ds151544.mlab.com:51544/heroku_9j5446ml`, {
        useMongoClient: true
    });

    connection.then(() => {
        callback(connection);
    }, (error) => {
        console.warn(error.message);
    });
}