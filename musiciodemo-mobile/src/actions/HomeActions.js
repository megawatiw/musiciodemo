import { AsyncStorage, Alert } from 'react-native';
import * as auth from '../api/http/auth';
import * as api from '../api/http/api';
import { Actions } from "react-native-router-flux";

export const homeEnter = () => {
    return {
        type: 'HOME',
        payload: 'Welcome'
    };
};

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: 'LOGOUT'
        });

        auth.logout()
        .then((user) => {
            clearData(dispatch, user);
            logoutSuccess(dispatch, user);
        })
        .catch((err) => console.log(err));
    }
}

export const checkUserSession = () => {
    return (dispatch) => {
        dispatch({
          type: 'CHECK_SESSION'
        });

        api.getUsername()
        .then((session) => {      
            if(session.data.error) {
              sessionNotExist(dispatch)
            }
            else {
              sessionExist(dispatch)
            }
        })
        .catch(() => {
            sessionNotExist(dispatch)
        })
    }
}

const clearData = async (dispatch, user) => {
    try {
        await AsyncStorage.removeItem('auth-token');
        Alert.alert('Logout success');
        logoutSuccess(dispatch, user);
    }
    catch(e) {
        console.log('Error: logout -', e);
    }
}

const logoutSuccess = (dispatch, user) => {
    dispatch({
        type: 'LOGOUT_SUCCESS',
        payload: user
    });

    Actions.login();
}

const sessionExist = (dispatch) => {
    dispatch({
        type: 'SESSION_EXISTS',
    })
}

const sessionNotExist = (dispatch) => {
    dispatch({
        type: 'SESSION_NOT_EXISTS',
    })
}
