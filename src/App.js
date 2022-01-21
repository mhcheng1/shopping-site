import React from 'react';
import { useEffect, useState} from 'react';
import Items from './Components/Items/Items'
import Commerce from '@chec/commerce.js';

// notes: remember to add REACT_APP to access .env content

const commerce = new Commerce(process.env.REACT_APP_COMMERCEJS_KEY, true);

const App = () => {

    const [items, setItems] = useState([])

    const getItems = async () => {
        const response = await commerce.products.list()
        setItems(response.data)
    }

    useEffect(() => {
        getItems()
    }, [])

    return(
        <Items items={items}/>
    )
};

export default App;
