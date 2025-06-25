import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: "1",
      name: "Computadoras",
      description: "Laptops, desktops y componentes"
    },
    {
      id: "2", 
      name: "Periféricos",
      description: "Mouse, teclados, monitores"
    },
    {
      id: "3",
      name: "Software",
      description: "Aplicaciones y programas"
    }
  ],
  loading: false,
  error: null
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // creo categoria
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    
    // actualizo categoria
    updateCategory: (state, action) => {
      const { id, ...updatedCategory } = action.payload;
      const index = state.categories.findIndex(category => category.id === id);
      if (index !== -1) {
        state.categories[index] = { ...state.categories[index], ...updatedCategory };
      }
    },
    
    // elimino categoria
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
    
    // establezco loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
      // establezco error
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  addCategory, 
  updateCategory, 
  deleteCategory, 
  setLoading, 
  setError 
} = categoriesSlice.actions;

export default categoriesSlice.reducer; 