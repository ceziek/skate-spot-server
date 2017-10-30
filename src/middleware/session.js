import NodeSession from 'node-session';

const session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});

export default () => {
    return (req, res, next) => {
        console.log('Session manager');
        session.startSession(req, res, next);
    }
}
