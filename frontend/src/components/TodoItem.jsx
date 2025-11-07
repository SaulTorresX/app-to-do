// src/components/TodoItem.jsx

// 1. Recibe una nueva prop: onEdit
function TodoItem({ todo, onDelete, onEdit }) {
  const formattedDate = new Date(todo.dueDate).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="todo-item">
      <div className="todo-content">
        <h4>{todo.text}</h4>
        <p>Prioridad: {todo.priority}</p>
        <p>Vence: {formattedDate}</p>
        {todo.category && <span className="category">{todo.category}</span>}
      </div>
      <div className="todo-actions">
        {/* 2. Botón de Editar. Llama a onEdit pasando el 'todo' completo */}
        <button onClick={() => onEdit(todo)}>Editar</button>
        <button onClick={() => onDelete(todo._id)}>Borrar</button>
      </div>
    </div>
  );
}

export default TodoItem;