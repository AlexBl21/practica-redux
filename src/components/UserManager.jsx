import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUser, deleteUser, addUsersFromCSV } from '../features/users/usersSlice';
import { v4 as uuidv4 } from 'uuid';

const UserManager = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para limpiar formulario
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user'
    });
    setEditingUser(null);
  };

  // Función para manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingUser) {
      // Actualizar usuario existente
      dispatch(updateUser({ id: editingUser.id, ...formData }));
    } else {
      // Crear nuevo usuario
      dispatch(addUser({
        ...formData,
        id: uuidv4()
      }));
    }
    
    clearForm();
  };

  // Función para editar usuario
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  // Función para eliminar usuario
  const handleDelete = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      dispatch(deleteUser(userId));
    }
  };

  // Función para manejar importación de CSV
  const handleCSVImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const lines = csvData.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      
      const importedUsers = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',').map(value => value.trim());
          const user = {
            id: uuidv4(),
            name: values[headers.indexOf('name')] || '',
            email: values[headers.indexOf('email')] || '',
            role: values[headers.indexOf('role')] || 'user'
          };
          importedUsers.push(user);
        }
      }
      
      if (importedUsers.length > 0) {
        dispatch(addUsersFromCSV(importedUsers));
        alert(`${importedUsers.length} usuarios importados exitosamente`);
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                {editingUser ? 'Actualizar Usuario' : 'Crear Usuario'}
              </button>
              
              {editingUser && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          {/* Importar CSV */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Importar Usuarios desde CSV</h3>
            <p className="text-sm text-gray-600 mb-4">
              El archivo CSV debe tener las columnas: name, email, role
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVImport}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        {/* Lista de Usuarios */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestionar Usuarios</h2>
          
          <div className="space-y-4">
            {users.map(user => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager; 