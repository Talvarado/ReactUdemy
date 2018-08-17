import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user'); //this returns a promise
    dispatch({type: FETCH_USER, payload: res.data}); //only when we get responce will we dispatch the action, res is ouput from axios
    };      // when action creator is called, redux thunk sees that this is a function is returned thus it will wait make request, wait for response

export const handleToken = (token) => async dispatch =>{
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data}); //same as fetchUser
};//this is for paymetn credts vid 96

//same as above 
// export const fetchUser = () => {
//     return function(dispatch) { // when action creator is called, redux thunk sees that this is a function is returned thus it will wait make request, wait for response
//         axios
//             .get('/api/current_user') //this returns a promise
//             .then(res => dispatch({type: FETCH_USER, payload: res})) //only when we get responce will we dispatch the action
//     };
// };

//we made another proxy for ap calls in package.json
//action creator return an action*
//this is an action creater, makes an api request and asking if current user is logged in or not
//the purpose of action creater is to return an acton, which gets sent to all the reducers, which produces a new state and returns the new state to the redux store
//we use axios library to make an ajax request
//we use axos to make ajax requests

//redux thunk mkaes asyrchronus acton behavours behave how we expect



//$ npm install --save axios redux-thunk
//axios makes call to api, redux thunk creates an action

//'/api/current_user' comes from our authReducer file where t checks for user login


//the entire purpose of redux thunk is to let us create action creators that dont have to return an action, the action creator wont return an action this time, instead it will give the action to the dispactch function, and forwarded to the reducers
//we get the ability to get a handle directly onto the dispatch function