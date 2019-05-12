import axios from 'axios';

/*
    PUBLIC KEYS
 */

export function getPublicKeys() {
    return axios.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
}

/*
    CONFIG
 */

const firebase = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty',
    method: 'post',
    params: {
        key: process.env.FIREBASE_KEY
    },
    headers: {
        'Content-Type': 'application/json'
    }
});

/*
    API METHODS
 */

export function getNewIdToken(refreshToken) {
    return axios({
        url: 'https://securetoken.googleapis.com/v1/token',
        data: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }
    });
}

export function signUp(email, password) {
    return firebase({
        url: '/signupNewUser',
        data: {
            email: email,
            password: password,
            returnSecureToken: true
        }
    });
}

export function signIn(email, password) {
    return firebase({
        url: '/verifyPassword',
        data: {
            email: email,
            password: password,
            returnSecureToken: true
        }
    });
}

export function sendEmailVerification(idToken) {
    return firebase({
        url: '/getOobConfirmationCode',
        data: {
            idToken: idToken,
            requestType: 'VERIFY_EMAIL'
        }
    });
}

export function confirmEmailVerification(code) {
    return firebase({
        url: '/setAccountInfo',
        data: {
            oobCode: code
        }
    })
}

export function resetPassword(email) {
    return firebase({
        url: '/getOobConfirmationCode',
        data: {
            email: email,
            requestType: 'PASSWORD_RESET'
        }
    });
}

export function verifyPasswordReset(code) {
    return firebase({
        url: '/resetPassword',
        data: {
            oobCode: code
        }
    })
}

export function confirmPasswordReset(code, password) {
    return firebase({
        url: '/resetPassword',
        data: {
            oobCode: code,
            newPassword: password
        }
    })
}

export function updateEmail(idToken, email) {
    return firebase({
        url: '/setAccountInfo',
        data: {
            idToken: idToken,
            email: email,
            returnSecureToken: true
        }
    });
}

export function updatePassword(idToken, password) {
    return firebase({
        url: '/setAccountInfo',
        data: {
            idToken: idToken,
            password: password,
            returnSecureToken: true
        }
    });
}

export function deleteAccount(idToken) {
    return firebase({
        url: '/deleteAccount',
        data: {
            idToken: idToken
        }
    });
}