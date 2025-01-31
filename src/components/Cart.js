import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
    const showCart = useSelector(state => state.cart.showcart);

    if (!showCart) return null; 

    return (
        <div>
            <h2>Your Cart</h2>
        
        </div>
    );
};

export default Cart;
