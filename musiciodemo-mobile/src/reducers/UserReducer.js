import {
    USER_FETCH_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    user: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_FETCH_SUCCESS:
            return {user: action.payload};
        default:
            return state;
    }
}
