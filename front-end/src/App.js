import React from 'react';
import { useEffect, useState} from 'react';
import Items from './Components/Items/Items'
import Navbar from './Components/Navbar/Navbar'
import Commerce from '@chec/commerce.js';
import Cart from './Components/Cart/Cart'
import { Route, Routes, Link, BrowserRouter, BrowserRouter as Router } from 'react-router-dom'
import Checkout from './Components/Checkout/Checkout'

/*  Notes
    remember to add REACT_APP to access .env content
    use element={} instead of component in routes 
*/

const commerce = new Commerce(process.env.REACT_APP_COMMERCEJS_KEY, true);

const App = () => {

    const [items, setItems] = useState([])
    const [cart, setCart] = useState({ line_items: [] })

    const getItems = async () => {
        const response = await commerce.products.list()
        setItems(response.data)
    }

    const getCart = async() => {
        const response = await commerce.cart.retrieve()
        setCart(response)
    }

    const addToCart = async(id, quantity) => {
        const response = await commerce.cart.add(id, quantity)
        setCart(response.cart)
    }

    const updateCart = async(id, quantity) => {
        const response = await commerce.cart.update(id, quantity)
        setCart(response.cart)
    }


 
    useEffect(() => {
        getItems()
        getCart()
    }, [])
    
    // useEffect(() => {
    //     console.log(cart)
    // }, [cart])

    return(
        <Router> 
            <Navbar cart={cart} />
            <Routes> 
                <Route exact path="/" element={<Items items={items} addToCart={addToCart} />} />
                <Route exact path='/cart' element={<Cart cart={cart} updateCart={updateCart} />} />
            </Routes>
        </Router>
    )
};

export default App;
