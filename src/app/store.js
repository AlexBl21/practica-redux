import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import cartReducer from '../features/cart/cartSlice';
import usersReducer from '../features/users/usersSlice';

export const store= configureStore({
    reducer:{
        products: productsReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        users: usersReducer
    }
})
