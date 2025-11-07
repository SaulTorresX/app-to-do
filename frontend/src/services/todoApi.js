// src/services/todoApi.js
import axios from 'axios';

// La URL base de la API de TODO
const API_URL = 'http://localhost:5000/api/todos';

// --- ¡NUEVO CLIENTE DE API! ---
// Crea una instancia de axios que usaremos para TODO
const apiClient = axios.create({
  baseURL: API_URL
});

// --- INTERCEPTOR DE PETICIONES ---
// Esto se ejecuta antes de cualquier petición de apiClient
apiClient.interceptors.request.use(
  (config) => {
    // 1. Busca el token en el localStorage del navegador
    const token = localStorage.getItem('token');
    
    // 2. Si el token existe, añádelo a los headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- AHORA, USA 'apiClient' EN LUGAR DE 'axios' ---

export const getTodos = (params = {}) => {
  // Ahora usa apiClient, que ya tiene el token
  return apiClient.get('/', { params }); 
};

export const createTodo = (todoData) => {
  return apiClient.post('/', todoData);
};

export const updateTodo = (id, updateData) => {
  return apiClient.put(`/${id}`, updateData);
};

export const deleteTodo = (id) => {
  return apiClient.delete(`/${id}`);
};