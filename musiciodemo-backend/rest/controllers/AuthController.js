import express from 'express';
import { verifyCookie, getTokens } from '../../util/middleware/authentication';
import { revokeToken } from '../../util/authentication/tokenManager'
import * as firebase from '../../util/http/firebase';
import User from '../models/User';

const router = express.Router();

// post /api/auth/register
router.post('/register', (req, res) => {
    firebase.signUp(req.body.email, req.body.password).then((_res) => {
        firebase.sendEmailVerification(_res.data.idToken).then((res) => {
            res.send('success');
        }).catch((error) => {
            console.log('sendEmailVerification - Error: ', JSON.stringify(error));
            res.send(JSON.stringify(error));
        });
    }).catch((error) => {
        console.log('signUp - Error');
        res.send({error: 'Unauthorized', message: error.response.data.error.message});
    });
});

// post /api/auth/login
router.post('/login', (req, res) => {
    firebase.signIn(req.body.email, req.body.password).then((_res) => {
        res.cookie('sid', _res.data.idToken, {maxAge: 86400, httpOnly: true, domain: 'localhost'});
        res.cookie('sidr', _res.data.refreshToken, {maxAge: 86400, httpOnly: true, domain: 'localhost'});
        res.send({
            status: "success",
            sid: _res.data.idToken,
            sidr: _res.data.refreshToken
        });
    }).catch((error) => {
        console.log('ERR LOGIN', error);
        res.send({error: 'Unauthorized', message: error.response.data.error.message});
    })
});

// post /api/auth/logout
router.post('/logout', verifyCookie, (req, res) => {
    res.clearCookie('sid');
    res.clearCookie('sidr');

    //REVOKE TOKEN
    res.send('success');
});

// post /api/auth/updateEmail
router.post('/updateEmail', getTokens, (req, res) => {
    firebase.updateEmail(res.locals.idToken, req.body.email).then((_res) => {
        checkFirebaseResponse(_res).then(() => {
            firebase.sendEmailVerification(res.locals.idToken).then(() => {
                checkFirebaseResponse(_res).then(() => {
                    res.send('success');
                }).catch((error) => {
                    res.send(JSON.stringify({error: 'Unauthorized', message: error}));
                });
            }).catch((error) => {
                res.send({error: 'Unauthorized', message: error.response.data.error.message});
            });
        }).catch((error) => {
            res.send(JSON.stringify({error: 'Unauthorized', message: error}));
        });
    }).catch((error) => {
        res.send({error: 'Unauthorized', message: error.response.data.error.message});
    });
});

// post /api/auth/updatePassword
router.post('/updatePassword', getTokens, (req, res) => {
    firebase.updatePassword(res.locals.idToken, req.body.password).then((_res) => {
        checkFirebaseResponse(_res).then(() => {
            // REVOKE TOKEN
            res.clearCookie('sid');
            res.clearCookie('sidr');
            res.send('success');
        }).catch((error) => {
            res.send(JSON.stringify({error: 'Unauthorized', message: error}));
        });
    }).catch((error) => {
        res.send({error: 'Unauthorized', message: error.response.data.error.message});
    });
});

// post /api/auth/resetPassword
router.post('/resetPassword', (req, res) => {
    firebase.resetPassword(req.body.email).then((_res) => {
        res.send('success');
    }).catch((error) => {
        res.send({error: 'Unauthorized', message: error.response.data.error.message});
    });
});

// post /api/auth/delete
router.post('/delete', getTokens, (req, res) => {
    firebase.deleteAccount(res.locals.idToken).then((_res) => {
        checkFirebaseResponse(_res).then(() => {
            // REVOKE TOKEN
            res.clearCookie('sid');
            res.clearCookie('sidr');
            res.send('success');
        }).catch((error) => {
            res.send(JSON.stringify({error: 'Unauthorized', message: error}));
        });
    }).catch((error) => {
        res.send({error: 'Unauthorized', message: error.response.data.error.message});
    });
});

/**
 * Checks if the response from the firebase REST api resulted in an error. If the error is because the id token is
 * expired, it will try to exchange the refresh token for a new id and refresh token.
 *
 * @param {res} The response of the firebase REST request.
 * @returns {Promise<any>} If there was no error, it returns nothing on resolve. If there was an error because the
 * id token expired, it returns the new id and refresh token on resolve. In all other cases it rejects with an error
 * message.
 */
function checkFirebaseResponse(res) {
    return new Promise((resolve, reject) => {
        if (!res.data.error) {
            resolve();
        } else {
            if (res.data.error.message === 'INVALID_ID_TOKEN') {
                firebase.getNewIdToken(res.locals.refreshToken).then((_res) => {
                    if (!_res.data.error) {
                        resolve({
                            idToken: _res.data.id_token,
                            refreshToken: _res.data.refresh_token
                        });
                    } else {
                        reject(_res.data.error.message);
                    }
                }).catch((error) => {
                    reject(error.response.data.error.message);
                });
            } else {
                reject(res.data.error.message);
            }
        }
    });
}

module.exports = router;