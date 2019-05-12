import axios from "axios";
import Config from 'react-native-config';

const auth = axios.create({
    baseURL: Config.BACKEND_HOST + '/api/auth',
    method: 'post',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export function signUp(username, email, password) {
    return auth({
        url: '/register',
        data: {
            username: username,
            email: email,
            password: password
        }
    });
}

export function signIn(email, password) {
    return auth({
        url: '/login',
        data: {
            email: email,
            password: password
        }
    });
}

export function logout() {
    return auth({
        url: '/logout'
    });
}

export function updateEmail(email) {
    return auth({
        url: '/updateEmail',
        data: {
            email: email
        }
    });
}

export function verifyEmail(email) {
    return auth({
        url: '/verifyEmail',
        data: {
            email: email
        }
    });
}

export function updatePassword(password) {
    return auth({
        url: '/updatePassword',
        data: {
            password: password
        }
    })
}

export function resetPassword(email) {
    return auth({
        url: '/resetPassword',
        data: {
            email: email
        }
    })
}

export function deleteAccount() {
    return auth({
        url: '/delete'
    });
}
