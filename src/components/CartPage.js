// src/components/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store';
import { Box, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';

const CartPage = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

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
              <ListItemText 
                primary={`${item.name} - $${item.price}`} 
                secondary={`Description: ${item.description} | Quantity: ${item.quantity}`} 
              />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleIncreaseQuantity(item.id)}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDecreaseQuantity(item.id)}
                  sx={{ mx: 1 }}
                  disabled={item.quantity === 1} // Disable button if quantity is 1
                >
                  -
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CartPage;
