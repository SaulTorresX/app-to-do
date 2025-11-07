// src/components/FilterControls.jsx
import React, { useState } from 'react';

// Recibe la función 'onFilterChange' desde App.jsx
function FilterControls({ onFilterChange }) {
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('dueDate'); // Ordenar por fecha por defecto

  // Cuando CUALQUIER filtro cambia, llamamos a esta función
  const handleFilter = () => {
    onFilterChange({
      priority,
      category,
      sortBy,
    });
  };

  // Función simple para limpiar
  const handleClear = () => {
    setPriority('');
    setCategory('');
    // Al limpiar, también disparamos el filtro para que se actualice la lista
    onFilterChange({
      priority: '',
      category: '',
      sortBy,
    });
  };

  return (
    <div className="filter-controls">
      <h4>Filtrar y Ordenar</h4>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="dueDate">Más cercanos a vencer</option>
        <option value="priority">Mayor prioridad</option>
      </select>
      
      <input
        type="number"
        placeholder="Filtrar Prioridad (1-5)"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        min="1" max="5"
      />
      
      <input
        type="text"
        placeholder="Filtrar Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      
      <button onClick={handleFilter}>Filtrar</button>
      <button onClick={handleClear}>Limpiar Filtros</button>
    </div>
  );
}

export default FilterControls;