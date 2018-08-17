import {combineReducers} from 'redux';
import authReducer from './authReducer';

export default combineReducers ({
    auth: authReducer
});


//we need another index.js files because its how we import the whoel reducers