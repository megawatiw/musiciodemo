import axios from 'axios';
import Config from 'react-native-config';
import { AsyncStorage } from 'react-native';

let authToken = {
    token: ''
};

const api = axios.create({
    baseURL: Config.BACKEND_HOST + '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
});

const _init = () => {
    getAuthToken()
        .then((data) => {
            authToken = data;
            axios.defaults.headers.common['Cookie'] = `${authToken.token}`;
        });
    console.log(axios.defaults.headers.common['Cookie']);
};

const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem('auth-token');
        if (token !== null) {
            return {token};
        }
        return 'Error: failed to get auth token';
    } catch (e) {
        console.log('Error: ', e);
    }
};


export function getUsername() {
    _init();

    return api({
        url: '/users/info',
        method: 'get',
    });

}

export function getUserProfile() {
    return api({
        url: '/users/profile',
        method: 'get'
    });
}
