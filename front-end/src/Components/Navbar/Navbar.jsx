import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import {GoogleLogin, GoogleLogout } from 'react-google-login';
import { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { userId } from '../../Actions/userId';
import SubjectIcon from '@material-ui/icons/Subject';

const AppBar1 = styled.div`
  borderBottom: '1px solid';`;

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Navbar = ({ cart, emptyCart }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  
  useEffect(() => {
      if (currentUser === 'test@gmail.com') {
          setLoggedIn(true)
          setUser({
              givenName: 'Tester'
          })
          axios.post(SERVER_URL + '/api/db/insertUser',
          {
            email: 'test@gmail.com',
            first_name: 'Tester',
            last_name: 'Joe',
            name: 'Tester Joe'
          })
      }
  }, [currentUser])

  const responseGoogle = (response) => {
    if (response.error) {
      console.log("login ERROR", response)
    }
    else {
      // On login register user into database
      // and set user email in redux state
      setLoggedIn(true)
      setUser(response.profileObj)
      dispatch(userId(response.profileObj.email))

      axios.post(SERVER_URL + '/api/db/insertUser',
      {
        email: response.profileObj.email,
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        name: response.profileObj.name
      })
      .then(function (response) {
        // console.log(response)
      })
      .catch(function (error){
        console.log("login post error: ", error)
      })
    }
  }

  // set logout states and empty cart
  const logout = () => {
    console.log("User has logged out");
    setLoggedIn(false)
    emptyCart()
    setUser()
    dispatch(userId(''))
  }

  // Only show certain features after login
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar1 position="fixed" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/"><HomeIcon /></Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            Shop
          </Typography>
          {!loggedIn 
            ? 
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            render={renderProps => (
              <>
              <IconButton aria-label="login" onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <Typography variant="h6" sx={{mr: 1}}>Login</Typography><AccountCircleIcon color='primary'/>
              </IconButton>
              </>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
            : 
            
          <>
          <Typography variant='h6' sx={{ mr: 3}}>Welcome! {user?.givenName}</Typography>
          <GoogleLogout 
            clientId={GOOGLE_CLIENT_ID}
            render={renderProps => (
              <>
              <IconButton aria-label="logout" onClick={renderProps.onClick} disabled={renderProps.disabled} >
              <Typography variant="h6" sx={{mr: 1}}>Logout</Typography><ExitToAppIcon color='primary'/>
              </IconButton></>
            )}
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
          <IconButton aria-label="history" sx={{ ml: '10px', mt: '6px' }}>
          <Typography variant='h6' sx={{ mb: 1, mr: 1}}>Order</Typography>
            <Link to="/history"><SubjectIcon /></Link>
          </IconButton>
          </>
          }
          <IconButton aria-label="cart" sx={{ ml: '10px', mt: '6px' }}>
          <Typography variant='h6' sx={{ mb: 1, mr: 1}}>Cart</Typography>
            <Badge badgeContent={cart.total_items} color="secondary">
              <Link to="/cart"><ShoppingCartIcon /></Link>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar1>
    </Box>
  )
};

export default Navbar;
