import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN,
    LOGIN_INFO_CHANGED,
} from "../actions/types";


const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        // USER FORM REDUCER
        case LOGIN_INFO_CHANGED:
            return {...state, [action.payload.prop]: action.payload.value};

        // LOGIN REDUCER
        case LOGIN:
            return {...state, loading: true, error: ''};
        case LOGIN_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload};
        case LOGIN_FAIL:
            return {...state, error: 'Authentication Failed.', password: '', loading: false};

        default:
            return state;
    }
}