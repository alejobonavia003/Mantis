import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlockLibrary from './AdminBlockLibrary';
import SortableList from './dnd/SortableList';
import SortableBlock from './blocks/SortableBlock';
import BlockConfigurator from './blocks/BlockConfigurator';

const PageEditor = ({ page }) => {
  const [pageBlocks, setPageBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showPinseladas, setShowPinseladas] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Función para reordenar bloques
  const arrayMove = (array, oldIndex, newIndex) => {
    const newArray = array.slice();
    const [movedItem] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, movedItem);

    return newArray.map((item, index) => ({
      ...item,
      orderIndex: index + 1
    }));
  };

  // Cargar bloques de la página específica
  useEffect(() => {
    const loadPageBlocks = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/blocks?page=${page}`);
        const sortedBlocks = response.data.sort((a, b) => a.displayOrder - b.displayOrder);
        setPageBlocks(sortedBlocks);
      } catch (err) {
        console.error(`Error loading ${page} blocks:`, err);
      }
    };
    loadPageBlocks();
  }, [page]);



  // Eliminar bloque
  const handleDeleteBlock = async (blockId) => {
    try {
      await axios.delete(`${apiUrl}api/blocks/${blockId}`);
      const updatedBlocks = pageBlocks
        .filter(block => block.id !== blockId)
        .map((block, index) => ({
          ...block,
          orderIndex: index + 1
        }));
      await axios.put(`${apiUrl}api/blocks/bulk-update`, { blocks: updatedBlocks });
      setPageBlocks(updatedBlocks);
      setSelectedBlock(null);
    } catch (err) {
      console.error('Error al eliminar bloque:', err);
    }
  };

  // Actualizar configuración del bloque
  const handleBlockUpdate = async (blockId, newConfig) => {
    try {
      await axios.put(`${apiUrl}api/blocks/${blockId}`, {
        ...selectedBlock,
        configuration: newConfig
      });
      setPageBlocks(prev =>
        prev.map(block =>
          block.id === blockId ? { ...block, configuration: newConfig } : block
        )
      );
    } catch (err) {
      console.error('Error updating block:', err);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      try {
        const newItems = arrayMove(
          pageBlocks,
          pageBlocks.findIndex(item => item.id === active.id),
          pageBlocks.findIndex(item => item.id === over.id)
        );
        const blocksToUpdate = newItems.map((item, index) => ({
          ...item,
          orderIndex: index + 1
        }));
        await axios.put(`${apiUrl}api/blocks/bulk-update`, { blocks: blocksToUpdate });
        setPageBlocks(blocksToUpdate);
      } catch (error) {
        console.error('Error al reordenar bloques:', error);
      }
    }
  };

 // Manejar nuevo bloque incluyendo la página
 const handleBlockAdded = (newBlock) => {
  const blockWithPage = { ...newBlock, page };
  setPageBlocks(prev => [...prev, blockWithPage].sort((a, b) => a.orderIndex - b.orderIndex));
  setSelectedBlock(blockWithPage); // Seleccionar automáticamente el nuevo bloque
};


const handleBlockSelect = (block) => {
  // Si el bloque seleccionado ya está seleccionado, deseleccionarlo
  if (selectedBlock && selectedBlock.id === block.id) {
    setSelectedBlock(null);
  } else {
    setSelectedBlock(block);
  }
};
  return (
    <div className="editorContainer">

      <BlockLibrary
        onSelectBlock={setSelectedBlock}
        onBlockAdded={handleBlockAdded}
        currentPage={page}
      />

      <div className="editorMain">
        <SortableList items={pageBlocks} onDragEnd={handleDragEnd}>
          <div className="blocksContainer">
            {pageBlocks.map((block) => (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} key={block.id}>
                <SortableBlock
                  block={block}
                  selectedBlock={selectedBlock}
                  handleBlockSelect={handleBlockSelect}
                  handleDeleteBlock={handleDeleteBlock}
                />
              </div>
            ))}
          </div>
        </SortableList>

        {selectedBlock && (
          <div className="configEditor">
            <h3>ESTAMOS VIENDO: </h3>
                {/* Círculo de información */}
                <div
                  className="infoCircle"
                  tabIndex={0}
                >
                  i
                  {/* Tooltip */}
                  <div className="infoTooltip">
                    <strong>Nombre:</strong> {selectedBlock.type} <br />
                    <strong>ID:</strong> {selectedBlock.id} <br />
                    <strong>Archivo:</strong> {selectedBlock.fileName || "CARGAR EN LA BASE DE DATOS EL NOMBRE DE ESTE ARCHIVO"} <br />
                    <strong>Creado:</strong> {selectedBlock.createdAt ? new Date(selectedBlock.createdAt).toLocaleString() : '-'} <br />
                    <strong>Modificado:</strong> {selectedBlock.updatedAt ? new Date(selectedBlock.updatedAt).toLocaleString() : '-'}
                  </div>
                </div>
            <BlockConfigurator
              block={selectedBlock}
              onUpdate={(newConfig) => handleBlockUpdate(selectedBlock.id, newConfig)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageEditor;

