import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: "1",
      name: "Laptop Gaming",
      description: "Laptop de alto rendimiento para gaming",
      price: 1299.99,
      category: "1",
      stock: 10,
      image: "https://media.istockphoto.com/id/1399174861/photo/gaming-laptop-computer-isolated-on-white.jpg?s=2048x2048&w=is&k=20&c=_oRjMlLe5aUjhuO48BCRRsIM6Oa3LoPfrJ1kkiQtX54="
    },
    {
      id: "2", 
      name: "Mouse Inalámbrico",
      description: "Mouse ergonómico con sensor óptico",
      price: 49.99,
      category: "2",
      stock: 25,
      image: "https://media.istockphoto.com/id/1091778794/photo/computer-mouse-isolated-on-white.jpg?s=2048x2048&w=is&k=20&c=Wzig558R_hhlQ4GgQddLbahAdASQGVUqcluNHHehzNo="
    },
    {
      id: "3",
      name: "Teclado Mecánico",
      description: "Teclado mecánico con switches Cherry MX",
      price: 89.99,
      category: "2", 
      stock: 15,
      image: "https://cdn.pixabay.com/photo/2023/04/10/10/30/keyboard-7913431_1280.jpg"
    }
  ],
  loading: false,
  error: null
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Crear producto
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    
    // Actualizar producto
    updateProduct: (state, action) => {
      const { id, ...updatedProduct } = action.payload;
      const index = state.products.findIndex(product => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
    
    // Eliminar producto
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    
    // Actualizar stock (cuando se compra)
    updateStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.stock -= quantity;
      }
    },
    
    // Establecer loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // Establecer error
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  updateStock, 
  setLoading, 
  setError 
} = productsSlice.actions;

export default productsSlice.reducer; 