import { Router } from 'express';
import mongoose from 'mongoose';
import graph from 'fbgraph';

export default ({ config, db }) => {
    const path = Router();

    const userSchema = new mongoose.Schema({
        id: String,
        name: String
    });

    const userModel = db.model('users', userSchema);

    path.post('/login', (req, res) => {

        /**
         * 200 { user data }    // facebook accepted
         * 403 {}   // facebook fail
         * 401 ...
         */
        let userData = {
            id: Number,
            name: String, // display name
            avatar: String,
            accessToken: String
        };



        const uid = req.body.uid;
        const accessToken = req.body.accessToken;

        res.sendStatus(200);

    });

    return path;
}