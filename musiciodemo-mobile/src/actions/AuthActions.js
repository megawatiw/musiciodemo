import {
    LOGIN_INFO_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN,
    SIGNUP_INFO_CHANGED,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    SIGNUP,
} from "./types";
import * as auth from '../api/http/auth';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from "react-native-router-flux";

export const loginInfoChanged = ({prop, value}) => {
    return {
        type: LOGIN_INFO_CHANGED,
        payload: {prop, value}
    };
};

export const signupInfoChanged = ({prop, value}) => {
    return {
        type: SIGNUP_INFO_CHANGED,
        payload: {prop, value}
    };
};

// SIGNUP: related actions
export const signupUser = ({username, email, password}) => {
    return (dispatch) => {
        dispatch({
            type: SIGNUP
        });
        auth.signUp(username, email, password)
            .then(user => signupSuccess(dispatch, user))
            .catch(() => signupFailed(dispatch))
    };
};

const signupSuccess = (dispatch, user) => {
    console.log(user);
    if (user.data.error !== 'Error') {
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: user
        });

        // Todo: return to login page with message: "Please check your email inbox to verify your account"
        Actions.login();
    }
    else {
        signupFailed(dispatch);
    }

};

const signupFailed = (dispatch) => {
    dispatch({
        type: SIGNUP_FAILED
    });
};

// SIGNUP: end of related actions


// LOGIN: related actions
export const login = ({email, password}) => {
    return (dispatch) => {
        dispatch({type: LOGIN});

        auth.signIn(email, password)
        .then((user) => {
              console.log(user);
              if(user.data.error === 'Error'){
                  if (user.data.message === 'Email not confirmed.') {
                        console.log('dsfdfaa');
                        auth.verifyEmail(email)
                            .then((verified) => Actions.verify())
                            .catch(() => loginFail(dispatch));
                  }
                  else {
                      loginFail(dispatch)
                  }
              }
              else {
                  resetSid(user.headers["set-cookie"]["0"])
                  .then(() => console.log('Info: Auth token has been reset successfully'))

                  loginSuccess(dispatch, user);
              }
          })
          .catch((err) => {
            console.log(err);
            loginFail(dispatch)
          });
    };
};

export const loginSocialSuccess = (user) => {
    return ({
        type: LOGIN_SUCCESS,
        payload: user
    });
};

const loginFail = (dispatch) => {
    dispatch({type: LOGIN_FAIL});
};

const loginSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: user
    });

    Actions.home();
};

// LOGIN: end of related actions

const resetSid = async (token) => {
    try {
        await AsyncStorage.setItem('auth-token', token);
        axios.defaults.headers.common['Cookie'] = `${token}`;
        console.log(axios.defaults.headers.common['Cookie']);
    } catch (e) {
        console.log('Error: reset sid -', e);
    }
};

const resetSidr = async (sidr) => {
    try {
        await AsyncStorage.setItem('sidr', sidr);
        axios.defaults.headers.common['Cookie'] = `sidr=${sidr}`;
    } catch (e) {
        console.log('Error: reset sidr -', e);
    }
};
