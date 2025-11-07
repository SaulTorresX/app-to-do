// src/components/TodoList.jsx
import TodoItem from './TodoItem';

// 1. Recibe la nueva prop 'onEdit'
function TodoList({ todos, onDelete, onEdit }) {
  if (todos.length === 0) {
    return <p>No hay pendientes. ¡Añade uno!</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit} // 2. Pásala al item
        />
      ))}
    </div>
  );
}

export default TodoList;