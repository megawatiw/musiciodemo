import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SongFormReducer from './SongFormReducer';
import SongReducer from "./SongReducer";
import SignupReducer from "./SignupReducer";
import UserReducer from "./UserReducer";
import HomeReducer from './HomeReducer';

export default combineReducers({
    auth: LoginReducer,
    signup: SignupReducer,
    songForm: SongFormReducer,
    home: HomeReducer,
    songs: SongReducer,
    user: UserReducer
});
