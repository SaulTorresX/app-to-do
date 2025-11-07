// src/App.jsx
import { useState, useEffect } from 'react';
import '../App.css'; 
// 1. Importa 'updateTodo'
import { getTodos, createTodo, deleteTodo, updateTodo } from '../services/todoApi';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import FilterControls from '../components/FilterControls';
import { useNavigate } from 'react-router-dom';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priority: '',
    category: '',
    sortBy: 'dueDate',
  });
  const navigate = useNavigate();
  
  // 2. NUEVO ESTADO: Guarda el 'todo' que estamos editando
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  // --- FUNCIONES DE API ---

  // frontend/src/App.jsx

const fetchTodos = async () => {
    try {
      setLoading(true);
      //  Pasa el estado 'filters' a getTodos.
      const response = await getTodos(filters); 
      setTodos(response.data);
    } catch (error) {
      console.error('Error al cargar pendientes:', error);
    } finally {
      // Quitar el "Cargando..."
      setLoading(false); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  
  const handleFormSubmit = async (todoData) => {
    try {
      if (editingTodo) {
        await updateTodo(editingTodo._id, todoData);
        setEditingTodo(null);
      } else {
        await createTodo(todoData);
      }
      
      // *Después* de que la API responde, refrescamos la lista
      fetchTodos(); // Ya no hay "return"

    } catch (error) {
      console.error('Error al guardar pendiente:', error);
    }
  };
  // ...

  const handleDeleteTodo = async (id) => {
    try {
      // Llama a la API para borrar el item por su ID
      await deleteTodo(id);
      
      // Refresca la lista para que desaparezca
      fetchTodos(); 
    } catch (error) {
      console.error('Error al borrar pendiente:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
      setFilters(newFilters);
  };

  // 4. NUEVA FUNCIÓN: Se activa con el botón "Editar" del item
  const handleEditTodo = (todo) => {
    // Guarda el 'todo' completo en el estado
    setEditingTodo(todo);
    // (Opcional: Sube la pantalla al formulario)
    window.scrollTo(0, 0); 
  };
  
  // 5. NUEVA FUNCIÓN: Para el botón de "Cancelar" en el formulario
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // --- RENDER ---
  return (
    <div className="App">
      {/* 5. AÑADE UN HEADER CON LOGOUT */}
      <header className="app-header">
        <h1>App de Pendientes</h1>
        <button onClick={handleLogout} className="danger">Cerrar Sesión</button>
      </header>
        {/* 6. Pasa los datos al formulario */}
      <TodoForm
        onSubmit={handleFormSubmit}
         // Pasa el 'todo' a editar (o null si es nuevo)
        todoToEdit={editingTodo} 
        // Pasa la función para cancelar
        onCancelEdit={handleCancelEdit} 
      />
      
      <FilterControls onFilterChange={handleFilterChange} />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo} // 7. Pasa la función de editar
        />
      )}
    </div>
  );
}

export default TodoPage;