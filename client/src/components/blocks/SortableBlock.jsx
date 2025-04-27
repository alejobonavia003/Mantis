import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import BlockPreview from './BlockPreview';
import styles from './render/styles/storeableBlock.styles'; // Importamos el objeto de estilos

const SortableBlock = ({ 
  block, 
  selectedBlock, 
  handleBlockSelect, 
  handleDeleteBlock 
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id
  });

  const style = {
    ...styles.blockItem,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    ...(selectedBlock?.id === block.id ? styles.selected : {}),
  };

  // Manejo simple de hover para el botón (se puede mejorar usando un hook o librería)
  const [isHover, setIsHover] = useState(false);
  const buttonStyle = isHover
    ? { ...styles.deleteButton, ...styles.deleteButtonHover }
    : styles.deleteButton;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => handleBlockSelect(block)}
    >
      <div 
        style={styles.blockHeader} 
        {...attributes} 
        {...listeners}
      >
        <span>{block.type}</span>
        <button 
          style={buttonStyle}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteBlock(block.id);
          }}
        >
          Eliminar o mover
        </button>
      </div>
      <div style={styles.blockPreview}>
        <BlockPreview block={block} />
      </div>
    </div>
  );
};

export default SortableBlock;
