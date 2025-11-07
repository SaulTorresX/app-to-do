// src/components/TodoForm.jsx
// 1. Importa useEffect
import { useState, useEffect } from 'react';

// 2. Recibe las nuevas props: todoToEdit y onCancelEdit
function TodoForm({ onSubmit, todoToEdit, onCancelEdit }) {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState(3);
    // 3. Formatea la fecha para el input tipo "date" (YYYY-MM-DD)
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');

    // 4. NUEVO EFFECT: Rellena el form cuando 'todoToEdit' cambia
    
    useEffect(() => {
        if (todoToEdit) {
            setText(todoToEdit.text);
            setPriority(todoToEdit.priority);
            // El input <input type="date"> necesita 'YYYY-MM-DD'
            setDueDate(new Date(todoToEdit.dueDate).toISOString().split('T')[0]);
            setCategory(todoToEdit.category || '');
        } else {
            // Si no hay nada para editar, limpia el formulario
            clearForm();
        }
    }, [todoToEdit]); // Esta es la dependencia
    
    const clearForm = () => {
        setText('');
        setPriority(3);
        setDueDate('');
        setCategory('');
    };

    // 1. CONVIERTE ESTA FUNCIÓN EN ASYNC

  // ...
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !dueDate || !priority) {
      alert('Texto, Prioridad y Fecha Límite son obligatorios');
      return;
    }

    try {
      // Llama a la función de App.jsx, pero no necesita "await" aquí.
      // App.jsx se encargará de refrescar la lista.
      onSubmit({ text, priority, dueDate, category });
      
      // Limpia el formulario inmediatamente
      clearForm(); 

    } catch (error) {
      console.error('Error desde el formulario:', error);
      alert('No se pudo guardar el pendiente. Intenta de nuevo.');
    }
  };
  // ...

    return (
        // 5. Cambia el título y el botón si estamos editando
        <form onSubmit={handleSubmit} className="todo-form">
            <h3>{todoToEdit ? 'Editando Pendiente' : 'Añadir Pendiente'}</h3>
            <input
                type="text"
                placeholder="¿Qué hay que hacer?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            {/* ... (input de priority sin cambios) ... */}
            <input
                type="number"
                placeholder="Prioridad (1-5)"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                min="1"
                max="5"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <input
                type="text"
                placeholder="Categoría (Opcional)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">{todoToEdit ? 'Guardar Cambios' : 'Añadir'}</button>

            {/* 6. Muestra el botón de Cancelar SOLO si estamos editando */}
            {todoToEdit && (
                <button type="button" onClick={onCancelEdit}>
                    Cancelar
                </button>
            )}
        </form>
    );
}

export default TodoForm;