/**
 * Archivo: authRoutes.js
 * Descripción: Rutas para el registro y autenticación de usuarios (API REST con Express).
 * Autor: Kevin Andres Hernandez Sanabria
 * Programa: ADSO - SENA
 */

const express = require('express');
const router = express.Router();

// Ruta para el Registro de Usuario: POST /api/auth/register
router.post('/register', (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        // Validar que los campos no estén vacíos
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Simulación de registro exitoso
        return res.status(201).json({ 
            mensaje: 'Usuario registrado exitosamente',
            usuario: { nombre, email }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor: ' + error.message });
    }
});

// Ruta para el Inicio de Sesión: POST /api/auth/login
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        // Validación de credenciales de prueba
        if (email === 'admin@sena.edu.co' && password === '12345') {
            return res.status(200).json({ 
                mensaje: 'Autenticación satisfactoria', 
                status: 'success' 
            });
        } else {
            return res.status(401).json({ 
                error: 'Error en la autenticación: usuario o contraseña incorrectos' 
            });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor: ' + error.message });
    }
});

module.exports = router;