import jwt from 'jsonwebtoken';
import { getPublicKeys } from '../http/firebase';

var publicKeys;

setPublicKeys();

export function setPublicKeys() {
    getPublicKeys().then((res) => {
        publicKeys = res.data;
    }).catch((error) => {
        console.log('Could not fetch public keys.');
    });
}

export function getMatchingKey(idToken) {
    const headers = getHeaders(idToken);

    const kid = Object.keys(publicKeys).find((kid) => {
        return kid === headers.kid;
    });

    return publicKeys[kid];
}

export function verifyIdTokenAndClaims(idToken) {
    console.log(idToken);
    return new Promise((resolve, reject) => {
        verifyIdToken(idToken).then((decoded) => {
            const options = {
                iss: 'https://securetoken.google.com/auth-test-3eb6b',
                aud: 'auth-test-3eb6b'
            };

            let error = verifyClaims(idToken, options);

            if (!error) {
                resolve(decoded);
            } else {
                reject(error);
            }
        }).catch((error) => {
            reject(error.name);
        });
    });
}

export function verifyIdToken(idToken) {
    const key = getMatchingKey(idToken);

    return new Promise((resolve, reject) => {
        jwt.verify(idToken, key, (error, decoded) => {
            if (error) {
                reject(error);
            }
            resolve(decoded);
        });
    });
}

export function verifyClaims(token, options) {
    const decodedClaims = (typeof token === 'object') ? token : getClaims(token);

    if (!decodedClaims.email_verified) {
        return 'UnverifiedEmailError';
    }

    const current_time = Date.now() / 1000;

    if (decodedClaims.exp < current_time) {
        return 'TokenExpiredError';
    }

    if (decodedClaims.iat > current_time) {
        return 'IssueTimeError';
    }

    if (decodedClaims.auth_time > current_time) {
        return 'AuthTimeError';
    }

    if (decodedClaims.iss !== options.iss) {
        return 'WrongIssuerError';
    }

    if (decodedClaims.aud !== options.aud) {
        return 'WrongAudienceError';
    }

    if (decodedClaims.sub !== decodedClaims.user_id) {
        return 'WrongSubjectError';
    }

    return null;
}

export function getHeaders(token) {
    return base64decode(token.split('.')[0]);
}

export function getClaims(token) {
    return base64decode(token.split('.')[1]);
}

export function getDecodedToken(token) {
    let decoded = {
        header: getHeaders(token),
        payload: getClaims(token)
    };

    return decoded;
}

export function base64decode(base64) {
    let decoded = Buffer.from(base64, 'base64').toString();
    return JSON.parse(decoded);
}
