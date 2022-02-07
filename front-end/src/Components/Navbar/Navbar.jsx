import React from 'react';
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

const AppBar1 = styled.div`
  borderBottom: '1px solid';`;

const Navbar = ({ cart }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

  const responseGoogle = (response) => {
    if (response.error) {
      console.log("login ERROR", response)
    }
    else {
      console.log(response);
      setLoggedIn(true)
      setUser(response)
    }
  }

  const logout = () => {
    console.log("User has logged out");
    setLoggedIn(false)
  }

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
              <><Typography variant="h6">Login</Typography>
              <IconButton aria-label="login" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <AccountCircleIcon color='primary'/>
              </IconButton>
              </>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
            : 
          <> <Typography variant='h6' sx={{ mr: 2}}>Welcome! {user?.profileObj.givenName}</Typography>
          <GoogleLogout 
            clientId={GOOGLE_CLIENT_ID}
            render={renderProps => (
              <><Typography variant="h6">Logout</Typography>
              <IconButton aria-label="logout" onClick={renderProps.onClick} disabled={renderProps.disabled} >
                <ExitToAppIcon color='primary'/>
              </IconButton></>
            )}
            buttonText="Logout"
            onLogoutSuccess={logout}
          /></>
          }
          <IconButton aria-label="cart" sx={{ ml: '10px', mt: '6px' }}>
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
