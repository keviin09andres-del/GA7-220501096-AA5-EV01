/**
 * Componente: UserList.jsx
 * Descripción: Componente presentacional encargado de renderizar la tabla 
 * con la lista de usuarios y los botones de acción (Editar y Eliminar).
 * Autor: Kevin Andres Hernandez Sanabria
 * Programa: ADSO - SENA
 */

import React from 'react';

const UserList = ({ users, onDelete, onEdit }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Lista de Usuarios Registrados</h5>
      </div>
      <div className="card-body">
        {users.length === 0 ? (
          <div className="alert alert-warning text-center" role="alert">
            No hay registros disponibles en este momento.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-secondary">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombre}</td>
                    <td>{user.email}</td>
                    <td className="text-center">
                      {/* Botón de Editar */}
                      <button 
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => onEdit(user)}
                      >
                        Editar
                      </button>
                      {/* Botón de Eliminar */}
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(user.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;