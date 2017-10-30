import {Router} from 'express';



export default () => {

    return (req, res, next) => {
        console.log(req.path)
        if (req.path !== '/login' && !req.session.accessToken) {
            //res.sendStatus(403);
        }

        next();
    }
}