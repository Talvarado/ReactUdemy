import 'materialize-css/dist/css/materialize.min.css'; //imports from our node_modules folder after npm install --save materialize, no need to ../ because its in our moduels
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';

//an action creater, where we initiate change, modify the state

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// const store = createStore(() => [], {}, applyMiddleware());
// all the different reducers in our app () => [] is a dummy reducer, second arguent s for server side states also we will make an {} because we dont have any, third iddleware
//look at diagram
//getState, dispatch (lets you dispatch actions to change state of application, subscrine (lets you register a collback so you can update your ui of yoru app))

ReactDOM.render(
<Provider store = {store}> 
    <App/>
</Provider>,
 document.querySelector('#root')
);     

// console.log('stripe key is ', process.env.REACT_APP_STRIPE_KEY);
// console.log('ENVIRONMENT is ', process.env.NODE_ENV);

//Provider tag is a react component that knows how to read changes from our redux store, so when changes happen the provider will imform all the children components and update them with the new state

//if a file is exporting a class or object of anytype we capitalize it, if it only returns a function lowercase
//indexedDB.html File, houses our react app
// tree goes index -> App -> components
//second paraenter is our root that is in our html

//setup :
//our redux store cotains our state, calls for an action, an action is returned, informs reducers and updates our react app
//inside index, we need do set up our redux store and render a provider tag , provider is a react coponent provded to use by react-redux libary, wwhch makes sure react and redux work together nicley
//react-redux sole pupuse is to make sure react and redux work smoothly with each other
//redux store is the global data in our app

//$ npm install --save axios redux-thunk
//axios makes call to api, redux thunk creates an action