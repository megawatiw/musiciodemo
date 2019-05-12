import User from '../models/User';
import { verifyCookie } from "../../util/middleware/authentication";
import express from 'express';

const router = express.Router();

// get /api/users/info
router.get('/info', verifyCookie, (req, res) => {
    res.send({
        email: res.locals.decodedToken.email
    });
});

// get /api/users/profile
router.get('/profile', (req, res) => {
    res.send({
        email: res.locals.decodedToken.email
    });
});

// get /api/users/
router.get('/', (req, res) => {
    (async function () {
        let user = await User.add({
            username: 'Jan',
            password: 'jan123',
            gender: 'male'
        })
            .then((user) => console.log(JSON.stringify(user)))
            .catch((err) => console.log('err', err));
    }());
    res.send('GET response');
});

// post /api/users/
router.post('/', (req, res) => {
    res.send('POST response');
});

// put /api/users/
router.put('/', (req, res) => {
    res.send('PUT response');
});

// delete /api/users/
router.delete('/', (req, res) => {
    res.send('DELETE response');
});

module.exports = router;