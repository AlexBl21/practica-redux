import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@example.com",
      role: "admin"
    },
    {
      id: "2",
      name: "María García",
      email: "maria@example.com", 
      role: "user"
    }
  ],
  loading: false,
  error: null
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // creo usuario
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    
    // actualizo usuario
    updateUser: (state, action) => {
      const { id, ...updatedUser } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedUser };
      }
    },
    
    // elimino usuario
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    
    // agrego múltiples usuarios desde CSV
    addUsersFromCSV: (state, action) => {
      state.users.push(...action.payload);
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
  addUser, 
  updateUser, 
  deleteUser, 
  addUsersFromCSV, 
  setLoading, 
  setError 
} = usersSlice.actions;

export default usersSlice.reducer; 