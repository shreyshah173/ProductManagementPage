// src/components/FormPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store';
import { TextField, Button, Box, Typography } from '@mui/material';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    additionalDetails: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: Date.now(),
    };
    dispatch(addProduct(newProduct));
    setFormData({
      name: '',
      price: '',
      description: '',
      additionalDetails: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Product Form</Typography>
      <TextField
        name="name"
        value={formData.name}
        onChange={handleChange}
        label="Name"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="price"
        value={formData.price}
        onChange={handleChange}
        label="Price"
        type="number"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="description"
        value={formData.description}
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
        value={formData.additionalDetails}
        onChange={handleChange}
        label="AdditionalDetails"
        fullWidth
        margin="normal"
        required
      />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </Box>
    </Box>
  );
};

export default FormPage;
