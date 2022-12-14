import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { AllTransactionData, UserOrder } from '../../Firebase/firebase.util';
import './strip-button.scss';
import firebase from 'firebase';
import { selectCartItems, selectCartTotal } from '../../Redux/Cart/cart.selector';
import { ResetItems } from '../../Redux/Cart/cart.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


const StripeCheckoutButton = ({price,cartItems,ResetItems}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51LisCGSG6kLOS5oKRETyA4zvbQc1i7zFvnEShZ7xECSVgyaLaHQSWZK7rfiswLyTQVNiq60nixEvqoEiQSK4MlnF00tjkLEeSx';
    const onToken = token => {
        token.price = price
        token.cartItems = cartItems
        console.log(token);
        var user = firebase.auth().currentUser;
        if(user){
            AllTransactionData(token);
            UserOrder(token);
            ResetItems({data:"one"})
            alert("Order Successfull")
            
        }else{
            alert("You Need to Sign In")
        }   
    }
    return ( 
        <StripeCheckout
        label="Pay Now"
        name="Pay Now"
        billingAddress
        shippingAddress
        allowRememberMe
        currency="INR"
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkgGcWy-Aw9Cf_Q41IYkG_gY2U6YB7HD1ZxA&usqp=CAU'
        description={`Your Total is ₹${price}`}
        amount={priceForStripe}
        panelLabel="pay Now"
        token={onToken}
        stripeKey={publishableKey}
        />
     );
}

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    total:selectCartTotal
});

const mapDispatchToProps = dispatch => ({
    ResetItems : item => dispatch(ResetItems(item))
  })
 
export default connect(mapStateToProps,mapDispatchToProps)(StripeCheckoutButton);