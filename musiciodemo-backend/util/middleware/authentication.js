import { verifyIdTokenAndClaims } from "../authentication/verify";
import { getNewIdToken } from "../http/firebase";

export function getIdToken(req, res, next) {
    if (req.cookies && 'sid' in req.cookies) {
        res.locals.idToken = req.cookies['sid'];
    }
    next();
}

export function getRefreshToken(req, res, next) {
    if (req.cookies && 'sidr' in req.cookies) {
        res.locals.refreshToken = req.cookies['sidr'];
    }
    next();
}

export function getTokens(req, res, next) {
    if (req.cookies && 'sid' in req.cookies && 'sidr' in req.cookies) {
        res.locals.idToken = req.cookies['sid'];
        res.locals.refreshToken = req.cookies['sidr'];
    }
    next();
}

export function verifyCookie(req, res, next) {
    if (req.cookies && 'sid' in req.cookies && 'sidr' in req.cookies) {
        let idToken = req.cookies['sid'];
        let refreshToken = req.cookies['sidr'];

        verifyIdTokenAndClaims(idToken).then((decoded) => {
            res.locals.decodedToken = decoded;
            console.log('verifyIdTokenAndClaims - Passed: ', decoded);
            next();
        }).catch((error) => {
            if (error === 'TokenExpiredError') {
                console.log('verifyIdToken - Expired');
                getNewIdToken(refreshToken).then((_res) => {
                    console.log('getNewIdToken - Passed', _res.data.id_token);
                    res.cookie('sid', _res.data.id_token, {maxAge: 86400, httpOnly: true, domain: 'localhost'});
                    res.cookie('sidr', _res.data.refresh_token, {maxAge: 86400, httpOnly: true, domain: 'localhost'});
                    next();
                }).catch((error) => {
                    //TODO: change error message, and log the thrown error
                    console.log('getNewIdToken - Failed', error);
                    // res.send();
                });
            } else {
                console.log('verifyClaims Error: ', JSON.stringify({error: 'Unauthorized', message: error}));
                res.send(JSON.stringify({error: 'Unauthorized', message: error}));
            }
        });
    } else {
        res.send(JSON.stringify({error: 'Unauthorized', message: 'No credentials provided'}));
    }
}