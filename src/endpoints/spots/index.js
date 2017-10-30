import {Router} from 'express';
import mongoose from 'mongoose';

const SpotSchema = {
    name: String,
    rank: {
        your: Number,
        average: Number
    },
    position: {
        lat: Number,
        long: Number
    },
};

const models = {
    spots: {
        GET: [{
            id: 'Number',
            name: '{String} eg. 3-Block Highschool spot',
            image: '{String} URL to cover image',
            rank: {
                your: '{Number} eg. 0.45',
                average: '{Number} eg. 0.65'
            },
            position: {
                lat: '{Number} lat position',
                long: '{Number} long position'
            },
            media: [
                {
                    id: '{Number}',
                    name: '{String}',
                    url: '{String}',
                }
            ]
        }],
        POST: {
            request: {
                header: {
                    'Content-Type': 'application/json'
                },
                body: {
                    name: '{String}',
                    image: '{String} Base64 image',
                    position: {
                        lat: '{Number} lat position',
                        long: '{Number} long position'
                    }
                }
            },
            responses: [
                {
                    status: 200,
                    message: 'Spot added correctly',
                    payload: {
                        id: '{Number} id freshly created spot'
                    }
                },
                {
                    status: 403,
                    message: 'User not logged'
                },
                {
                    status: 500,
                    message: 'Server Error'
                }
            ]
        }
    }
};

const schema = new mongoose.Schema(SpotSchema);


export default ({config, db}) => {
    const path = Router();

    const Spot = db.model('Spot', schema);

    path.get('/schema', (req, res) => {
        res.json(models.spots.GET);
    });

    path.post('/schema', (req, res) => {
        res.json(models.spots.POST);
    });

    path.get('/', (req, res) => {

        Spot
            .find()
            .sort('-date')
            .limit(10)
            .exec((err, spots) => {
                if (!err) {
                    res.json(spots);
                }

            })

    });

    path.post('/', (req, res) => {
        let newSpot = new Spot({
            name: req.body.name,
            image: '',
            rank: {
                your: 0,
                average: 0
            },
            position: {
                lat: req.body.lat,
                long: req.body.long
            }
        });

        newSpot.save()
            .then(item => {
                res.json({
                    id: item.id
                });
            })
            .catch((err) => {
                console.warn(err);
                res.sendStatus(500);
            })
    });



    return path;
};