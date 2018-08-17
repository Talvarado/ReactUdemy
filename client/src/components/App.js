import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';

const Dashboard = () => <h2> Dashboard </h2>
const SurveyNew = () => <h2> SurveyNew </h2>


class App extends Component {
    //lifecycle method to check if current user is signed in or not, it is an initial ajax request this will happen as soon as the app starts
    componentDidMount() {
        this.props.fetchUser();
    }


    render() {
        return (
            <div className = "container">
            <BrowserRouter> 
                    <div>
                        <Header/>
                    <Route exact path = "/" component ={Landing}/>
                    <Route exact path = "/surveys" component ={Dashboard} />
                    <Route exact path = "/surveys/new" component ={SurveyNew} />
                    </div>
            </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App); //frst is map to state, second is action creators

// first div container is class name because materiazlze expects t
//react setup

//browser router tells react router how to behavve// the brains behind it all
//route sets up a rule, and uses the coponents to show it all
//check out diagram on how auth wth header works !!! react comp -> acttion creater (acess the api ajax request) -> action
// <header/> will always be shown in all paths sinc eit doesnt have a realtive path

