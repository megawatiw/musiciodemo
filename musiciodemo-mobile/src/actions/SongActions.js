import { SONG_CREATE, SONG_UPDATE, SONGS_FETCH_SUCCESS } from "./types";
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const songUpdate = ({prop, value}) => {
    return {
        type: SONG_UPDATE,
        payload: {prop, value}
    }
};

export const songCreate = ({title, file, genre}) => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/songs`)
            .push({title, file, genre})
            .then(() => {
                dispatch({type: SONG_CREATE});
                Actions.songList({type: 'reset'});
            });
    };
};

export const songsFetch = () => {
    const {currentUser} = firebase.auth();

    return ((dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/songs`)
            .on('value', snapshot => {
                dispatch({type: SONGS_FETCH_SUCCESS, payload: snapshot.val()});
            });
    });
};