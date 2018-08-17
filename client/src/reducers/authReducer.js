import { FETCH_USER } from '../actions/types';

export default function (state = null, action) {
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false; //ths is user info, user model
        default:
        return state;
    }
}

//state is the representation of the data in your app
//the action is the representation of the change to that data
//the only requirement is to have a type (recommended to use string)
//index tells us which compoenent is doing what

//the only way to change the state is by the action

//pure functions are functions that return value depend solely on the values of their arguments, dont have any network or databse calls, only calculate new value
//predicatble, do not modfy the values passed to them

//impure may call database or network, they may overwrite values passed through them
//the next state is caluclated by previous state and action, this creates a new object
//state mutations* this function has to be pure and is called the reducer


//MIT FREE COURSE WARE
//CODING, ALGORITHMS, SYSTEM DESIGNS
//top coder
//code jam
//
