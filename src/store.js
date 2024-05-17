// src/store.js
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
  products: [],
  cart: [],
};

// Action Types
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

// Action Creators
export const addProduct = (product) => ({ type: ADD_PRODUCT, product });
export const editProduct = (product) => ({ type: EDIT_PRODUCT, product });
export const deleteProduct = (id) => ({ type: DELETE_PRODUCT, id });
export const addToCart = (product) => ({ type: ADD_TO_CART, product });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, id });
export const increaseQuantity = (id) => ({ type: INCREASE_QUANTITY, id });
export const decreaseQuantity = (id) => ({ type: DECREASE_QUANTITY, id });

// Reducers
const productReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.product];
    case EDIT_PRODUCT:
      return state.map(product => product.id === action.product.id ? action.product : product);
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.id);
    default:
      return state;
  }
};

const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingProduct = state.find(product => product.id === action.product.id);
      if (existingProduct) {
        return state.map(product =>
          product.id === action.product.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case REMOVE_FROM_CART:
      return state.filter(product => product.id !== action.id);
    case INCREASE_QUANTITY:
      return state.map(product =>
        product.id === action.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    case DECREASE_QUANTITY:
      return state.map(product =>
        product.id === action.id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      ).filter(product => product.quantity > 0);
    case EDIT_PRODUCT:
      return state.map(product => product.id === action.product.id ? action.product : product);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

export { store, persistor };
