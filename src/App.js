import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { store, persistor } from './store';
import FormPage from './components/FormPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Product Management
              </Typography>
              <Button color="inherit" component={Link} to="/">Form</Button>
              <Button color="inherit" component={Link} to="/products">Products</Button>
              <Button color="inherit" component={Link} to="/cart">Cart</Button>
            </Toolbar>
          </AppBar>
          <Container>
            <Box mt={2}>
              <Routes>
                <Route path="/" element={<FormPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </Box>
          </Container>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
