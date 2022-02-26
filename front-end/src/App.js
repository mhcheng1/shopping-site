import React from 'react';
import { useEffect, useState} from 'react';
import Items from './Components/Items/Items'
import Navbar from './Components/Navbar/Navbar'
import Commerce from '@chec/commerce.js';
import Cart from './Components/Cart/Cart'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Order from './Components/Checkout/Order'
import { increment } from './Actions'
import axios from 'axios'
import History from './Components/History/History';
import { useSelector } from 'react-redux';

/*  Notes
    remember to add REACT_APP to access .env content
    use element={} instead of component in routes 
*/

const commerce = new Commerce(process.env.REACT_APP_COMMERCEJS_KEY, true);
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const App = () => {
    const [items, setItems] = useState([])
    const [cart, setCart] = useState({ line_items: [] })

    useEffect(() => {
        getItems()
        getCart()
    }, [])

    const getItems = async () => {
        const response = await commerce.products.list()
        setItems(response.data.reverse())
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
    const emptyCart = async() => {
        const response = await commerce.cart.empty()
        setCart(response.cart)
        //console.log("cart emptied")
    }

    const user_email = useSelector(state => state.user)

    // update items in the database
    useEffect(() => {
        if (items.length > 0) {
            const newItems = items.map(i => {
                return [i.id, i.name, i.price.raw]
            })
            axios.post(SERVER_URL + '/api/insertItem', {
                items: newItems
            }).catch(function (error) {
                console.log(error)
            })
        }
    }, [items])

    return(
        <Router> 
            <Navbar cart={cart} emptyCart={emptyCart} />
            <Routes> 
                <Route exact path="/" element={<Items items={items} addToCart={addToCart} />} />
                <Route exact path='/cart' element={<Cart cart={cart} updateCart={updateCart} />} />
                <Route exact path='/order_complete' element={<Order cart={cart} emptyCart={emptyCart} />} />
                <Route exact path='/history' element={<History user_email={user_email} />} />
            </Routes>
        </Router>
    )
};

export default App;
