import React from 'react';
import { useEffect, useState} from 'react';

const Order = ({ cart, emptyCart }) => {
    const [storedCart, setStoredCart] = useState(false)
    useEffect(()=>{
        if (cart.total_items !== 0) {
            setStoredCart(cart)
        }
    }, [cart])

    useEffect(()=>{
        if (storedCart) {
            //emptyCart()
        }
        else {
            console.log("cart is empty")
        }
    }, [storedCart])

    return(
        <div>{storedCart? storedCart.id: "No Cart"}</div>
    )
};

export default Order;
