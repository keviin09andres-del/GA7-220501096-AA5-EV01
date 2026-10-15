import React, { useState, useEffect } from 'react';

function UserForm({ onUserSaved, editingUser, clearEditing, apiUrl }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('12345');

  useEffect(() => {
    if (editingUser) {
      setNombre(editingUser.nombre || '');
      setEmail(editingUser.email || '');
    } else {
      setNombre('');
      setEmail('');
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !email) {
      alert("Por favor completa los campos.");
      return;
    }

    const userData = { nombre, email, password: password || '12345' };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Usuario registrado exitosamente en la API!");
        onUserSaved({ nombre, email });
        setNombre('');
        setEmail('');
      } else {
        alert(data.mensaje || "Error al guardar el usuario");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      // Guardado local de respaldo si hay problemas de conexión CORS/API
      onUserSaved({ nombre, email });
      setNombre('');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>{editingUser ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>Nombre Completo: </label>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Correo Electrónico: </label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>
        Guardar
      </button>
      {editingUser && (
        <button 
          type="button" 
          onClick={clearEditing} 
          style={{ marginLeft: '10px', padding: '6px 12px', cursor: 'pointer' }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default UserForm;