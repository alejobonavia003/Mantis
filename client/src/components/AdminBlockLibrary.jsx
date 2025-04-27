// components/BlockLibrary.jsx
import React from 'react';
import axios from 'axios';
import { blockTypes } from './blocks/blockTypes.config';

const BlockLibrary = ({ currentPage, onBlockAdded }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAddBlock = async (type) => {
    try {
      const template = blockTypes[type];

      const newBlock = {
        type,
        page: currentPage, // Fallback para página
        configuration: { ...template.defaultConfig }, // Copia el objeto
      };

      const response = await axios.post(`${apiUrl}api/blocks`, newBlock);
      onBlockAdded(response.data);
    } catch (err) {
      console.error('Error completo:', err.response?.data || err.message);
    }
  };

  return (
    <div className="library-container">
      <h3>Agregar nuevo bloque</h3>

      <div className="blocks-grid">
        {Object.entries(blockTypes).map(([key, block]) => (
          <div key={key} className="block-card">
            <div className="block-header">
              <span className="block-icon">{block.icon}</span>
              <h4>{block.name}</h4>
            </div>
            <p className="block-description">{block.description}</p>
            <button
              className="add-button"
              onClick={() => handleAddBlock(key)}
            >
              Agregar bloque
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockLibrary;