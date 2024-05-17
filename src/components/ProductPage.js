// src/components/ProductPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, addToCart, editProduct } from '../store';
import { Box, Button, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';

const ProductPage = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    additionalDetails: '',
  });

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(editProduct(currentProduct));
    setIsEditing(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Products</Typography>
      {isEditing ? (
        <Box component="form" onSubmit={handleSave} sx={{ mt: 3 }}>
          <TextField
            name="name"
            value={currentProduct.name}
            onChange={handleChange}
            label="Name"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="price"
            value={currentProduct.price}
            onChange={handleChange}
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="description"
            value={currentProduct.description}
            onChange={handleChange}
            label="Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="additionalDetails"
            value={currentProduct.additionalDetails}
            onChange={handleChange}
            label="AdditionalDetails"
            fullWidth
            margin="normal"
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)} sx={{ ml: 2 }}>Cancel</Button>
          </Box>
        </Box>
      ) : (
        <List>
          {products.map(product => (
            <ListItem key={product.id}>
              <ListItemText primary={`${product.name} - ${product.price}$`} secondary={product.description} />
              <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              <Button variant="contained" color="secondary" onClick={() => handleEdit(product)} sx={{ ml: 2 }}>Edit</Button>
              <Button variant="contained" color="error" onClick={() => handleDelete(product.id)} sx={{ ml: 2 }}>Delete</Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ProductPage;
