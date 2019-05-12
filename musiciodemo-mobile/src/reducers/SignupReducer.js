import {
    SIGNUP_INFO_CHANGED,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    SIGNUP
} from "../actions/types";


const INITIAL_STATE = {
    email: '',
    password: '',
    username: '',
    user: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // USER FORM REDUCER
        case SIGNUP_INFO_CHANGED:
            return {...state, [action.payload.prop]: action.payload.value};

        // SIGNUP REDUCER
        case SIGNUP_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload, error: ''};
        case SIGNUP_FAILED:
            return {...state, error: 'Sign up failed!', loading: false, password: ''};
        case SIGNUP:
            return {...state, loading: true, error: ''};

        default:
            return state;
    }
}
