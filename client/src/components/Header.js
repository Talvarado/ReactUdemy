import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {//this.props.auth tells us if the user is currently logged into the application
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default: //when logged in
                return [
                    <li key="3" style={{ margin: '0 10px'}}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="1"><Payments /></li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
            ];
        }
    } //this will determine what wills show in the header depending if user is logged in or not or pending
    render() {
        return (
           <nav>
               <div className ="nav-wrapper">
                <Link 
                to={this.props.auth ? '/surveys' : '/'} 
                className = "left brand-logo"
                >
                    Emaily
                </Link>
                <ul className = "right">
                    {this.renderContent()}
                </ul>
                </div>
            </nav>
        );
    }
} //this.props.user ? '/surveys' : '/' if true go to surveys if falsy go to root


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);

//we make a class based component becuase we want to switch the state of the header, wth a helper or function, which will be responsible to tell us what we render (if authorized or not)