// src/components/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store';
import { Box, Button, Typography, List, ListItem, ListItemText, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CartPage = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        <List>
          {cart.map(item => (
            <ListItem key={item.id} sx={{ borderBottom: '1px solid #ddd' }}>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={8}>
                  <ListItemText 
                    primary={`${item.name} - $${item.price}`} 
                    secondary={`Description: ${item.description} | Quantity: ${item.quantity}`} 
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: isMobile ? 'center' : 'right', mt: isMobile ? 2 : 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleIncreaseQuantity(item.id)}
                    sx={{ mx: 1 }}
                  >
                    +
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDecreaseQuantity(item.id)}
                    disabled={item.quantity === 1} // Disable button if quantity is 1
                    sx={{ mx: 1 }}
                  >
                    -
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveFromCart(item.id)}
                    sx={{ mx: 1 }}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CartPage;
