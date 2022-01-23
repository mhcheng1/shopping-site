import React from 'react';
import { useEffect, useState} from 'react';
import Items from './Components/Items/Items'
import Navbar from './Components/Navbar/Navbar'
import Commerce from '@chec/commerce.js';

// notes: remember to add REACT_APP to access .env content

const commerce = new Commerce(process.env.REACT_APP_COMMERCEJS_KEY, true);

const App = () => {

    const [items, setItems] = useState([])
    const [cart, setCart] = useState({})

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

    

    useEffect(() => {
        getItems()
        getCart()
    }, [])
    
    useEffect(() => {
        console.log(cart)
    }, [cart])

    return(
        <div>
            <Navbar cart={cart} />
            <Items items={items} addToCart={addToCart} />
        </div>
     
    )
};

export default App;
