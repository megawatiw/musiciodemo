import { SONG_CREATE, SONG_UPDATE } from "../actions/types";

const INITIAL_STATE = {
    title: '',
    file: '',
    genre: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SONG_UPDATE:
            // action.payload === {prop: 'title', value: 'dog song'}
            // [action.payload.prop] : key interpolation
            return {...state, [action.payload.prop]: action.payload.value};
        case SONG_CREATE:
            return {INITIAL_STATE};
        default:
            return state;
    }
}
