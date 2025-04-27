import { useState } from 'react';
import ImageGallery from '../../AdminImageGallery';
import styles from '../render/styles/configuratorBlock.module.css';
import RichTextEditor from '../../dnd/RichTextEditor';

const IconListConfigurator = ({ config, onChange }) => {
  const [showGallery, setShowGallery] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handleSelectImage = (image) => {
    const newIcons = [...config.icons, image.url];
    handleChange('icons', newIcons);
    setShowGallery(false);
  };

  const addItem = () => {
    const newItems = [...config.items, { text: '' }];
    handleChange('items', newItems);
  };

  const removeItem = (index) => {
    const newItems = config.items.filter((_, i) => i !== index);
    handleChange('items', newItems);
  };

  const updateItem = (index, text) => {
    const newItems = [...config.items];
    newItems[index].text = text;
    handleChange('items', newItems);
  };

  return (
    
    <div className={styles.iconListConfigurator}>



      <label className={styles.label}>
        Descripción alta :
        <RichTextEditor
          type="text"
          value={config.description || ''}
          onChange={(content) => handleChange('description', content)} 
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Descripción baja1:
        <RichTextEditor
          type="text"
          value={config.description2 || ''}
          onChange={(content) => handleChange('description2', content)} 
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Descripción baja2:
        <RichTextEditor
          type="text"
          value={config.description3 || ''}
          onChange={(content) => handleChange('description3', content)} 
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Color de fondo:
        <input
          type="color"
          value={config.backgroundColor || '#ffffff'}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
          className={styles.colorInput}
        />
      </label>


        <label className={styles.label}>
              Texto del botón 1:
              <input
                type="text"
                value={config.buttonText1 || ''}
                onChange={(e) => handleChange('buttonText1', e.target.value)}
                className={styles.input}
              />
            </label>
      
            <label className={styles.label}>
              URL del botón 1:
              <input
                type="url"
                value={config.buttonUrl1 || ''}
                onChange={(e) => handleChange('buttonUrl1', e.target.value)}
                className={styles.input}
              />
            </label>
      
            <label className={styles.label}>
              Color del botón 1:
              <input
                type="color"
                value={config.buttonColor1 || '#007bff'}
                onChange={(e) => handleChange('buttonColor1', e.target.value)}
                className={styles.colorInput}
              />
            </label>

      <div className={styles.section}>
        <h3>Íconos</h3>
        <div className={styles.imageGrid}>
          {config.icons?.map((icon, index) => (
            <div key={index} className={styles.imageThumbnail}>
              <img src={icon} alt={`Icono ${index + 1}`} className={styles.imageiconlist}/>
              <button
                type="button"
                onClick={() => handleChange('icons', config.icons.filter((_, i) => i !== index))}
                className={styles.removeButton}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setShowGallery(true)}
            className={styles.addImageButton}
          >
            + Agregar Ícono
          </button>
        </div>
        {showGallery && (
        <div className={styles.galleryModal}>
          <ImageGallery onSelectImage={handleSelectImage} apiUrl={apiUrl} />
          <button
            type="button"
            onClick={() => setShowGallery(false)}
            className={styles.closeButton}
          >
            Cerrar Galería
          </button>
        </div>
      )}
      </div>

      <div className={styles.section}>
        <h3>Elementos de la lista</h3>
        <div className={styles.itemsContainer}>
          {config.items?.map((item, index) => (
            <div key={index} className={styles.listItem}>
              <RichTextEditor
                type="text"
                value={item.text || ''}
                onChange={(content) => updateItem(index, content)}
                placeholder={`Elemento ${index + 1}`}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className={styles.removeButton}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className={styles.addButton}
          >
            + Agregar Elemento
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default IconListConfigurator;