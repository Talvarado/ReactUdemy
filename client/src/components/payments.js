//STRIPE CHECKOUT COMPONENT

import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout 
            name="Emaily"
            description="$5 for 5 email credts"
            amount={500}
            token={token => this.props.handleToken(token)} //token={token => console.log(token) } 
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button> 
            </StripeCheckout>
        );
    }
}
export default connect(null, actions)(Payments);

//we need to ass two properties, amount -> of money (in cents, we want 5 dollars thus 500 cents)
//token -> expectng to recieve a call abck function that is called afetr we ahs sucessfully recieved a token by the api
// we made a button child element because we ddnt like the way the built in button looked 