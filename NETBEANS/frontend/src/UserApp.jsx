/**
 * Componente: UserApp.jsx
 * Descripción: Contenedor principal para la gestión de usuarios conectando con la API REST de Node.js
 * Autor: Kevin Andres Hernandez Sanabria
 * Programa: ADSO - SENA
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import UserList from './UserList';
import UserForm from './UserForm';

function UserApp() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // URL base apuntando al backend de Node.js
  const API_URL = 'http://localhost:3000/api/auth';

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  return (
    <div className="container mt-5" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 className="text-center mb-4">Módulo de Gestión de Usuarios - SENA</h2>
      
      {/* Formulario conectado a /register */}
      <UserForm 
        onUserSaved={(newUser) => {
          setUsers((prevUsers) => [...prevUsers, { ...newUser, id: Date.now() }]);
          setEditingUser(null);
        }} 
        editingUser={editingUser} 
        clearEditing={() => setEditingUser(null)} 
        apiUrl={`${API_URL}/register`}
      />

      <hr className="my-4" />

      {/* Visualización de la lista de usuarios */}
      {loading ? (
        <div className="text-center">
          <p>Cargando registros desde la base de datos...</p>
        </div>
      ) : (
        <UserList 
          users={users} 
          onDelete={handleDelete} 
          onEdit={handleEdit} 
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserApp />
  </React.StrictMode>
);

export default UserApp;