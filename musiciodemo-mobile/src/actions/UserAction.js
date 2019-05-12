import {} from "./types";
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import * as api from '../api/http/api';

export const userFetch = () => {
    const {currentUser} = api.getUserProfile();

    console.log(currentUser);

    return ((dispatch) => {
        dispatch({type: 'user_fetch_success', payload: currentUser});
    });
};
