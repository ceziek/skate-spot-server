import mongoose from 'mongoose';

const DB_USER = 'staging';
const DB_PASSWORD = 'staging';

export default callback => {
    mongoose.Promise = global.Promise;
    let connection = mongoose.createConnection(`mongodb://${DB_USER}:${DB_PASSWORD}@ds151544.mlab.com:51544/heroku_9j5446ml`, {
        useMongoClient: true
    });

    connection.then(() => {
        callback(connection);
    }, (error) => {
        console.warn(error.message);
    });
}