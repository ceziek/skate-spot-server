import { Router } from 'express';
import mongoose from 'mongoose';

export default ({ config, db }) => {
    const path = Router();
    const userSchema = new mongoose.Schema({
        id: String,
        name: String
    });

    const userModel = db.model('users', userSchema);

    path.get('/', (req, res) => {

        userModel
            .find({})
            .then((user) => {
                console.info('dupa', user)
            });

        res.sendStatus(200);
    });

    return path;
}