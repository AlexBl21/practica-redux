import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Agregar producto al carrito
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity
        });
      }
      
      // Recalcular totales
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Remover producto del carrito
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      
      // Recalcular totales
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Actualizar cantidad de un producto
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
      
      // Recalcular totales
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Limpiar carrito
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    
    // Finalizar compra (simulación)
    checkout: (state) => {
      // Aquí podrías agregar lógica adicional como guardar en historial
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  checkout 
} = cartSlice.actions;

export default cartSlice.reducer; 