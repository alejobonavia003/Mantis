import { useState } from 'react';
import styles from '../render/styles/configuratorBlock.module.css';
import ImageGallery from '../../AdminImageGallery';
import RichTextEditor from '../../dnd/RichTextEditor';

const PricingConfigurator = ({ config, onChange }) => {
  const MAX_CARDS = 3;

  const [showGallery, setShowGallery] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSelectImage = (image) => {
    handleChange('image', image.url);
    setShowGallery(false);
  };

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const updateCard = (index, field, value) => {
    const newCards = [...config.cards];
    newCards[index][field] = value;
    handleChange('cards', newCards);
  };

  const addCard = () => {
    if (config.cards.length >= MAX_CARDS) return;
    const newCard = {
      title: 'Nueva Tarjeta',
      description: 'Descripción del servicio',
      price: '00€',
      duration: 'Duración 00min',
      buttonText: 'Reservar',
      buttonColor: '#007bff',
      colorPrice: '#75aca8',
    };
    handleChange('cards', [...config.cards, newCard]);
  };

  const removeCard = (index) => {
    const newCards = config.cards.filter((_, i) => i !== index);
    handleChange('cards', newCards);
  };

  return (
    <>
      <label className={styles.label}>
        Título:
        <input
          type="text"
          value={config.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className={styles.input}
        />
      </label>

      <div className={styles.section}>
        <h3>Tarjetas ({config.cards?.length || 0}/3)</h3>

        {config.cards?.map((card, index) => (
          <div key={index} className={styles.cardConfig}>
            <h4>Tarjeta #{index + 1}</h4>

            <div>
              color de fondo de tarjeta:
              <input
                type="color"
                value={card.cardBackground || '#ffffff'}
                onChange={(e) => updateCard(index, 'cardBackground', e.target.value)}
                className={styles.colorInput}
              />
            </div>
            <div>
              Titulo de la tarjeta:
              <input
                type="text"
                value={card.title}
                onChange={(e) => updateCard(index, 'title', e.target.value)}
                placeholder="Título"
                className={styles.input}
              />
            </div>


            <div className={styles.grid2cols}>
              precio de la tarjeta:
              <input
                type="text"
                value={card.price}
                onChange={(e) => updateCard(index, 'price', e.target.value)}
                placeholder="Precio"
                className={styles.input}
              />

            color del precio:
              <input
                type="color"
                value={card.colorPrice || '#75aca8'}
                onChange={(e) => updateCard(index, 'colorPrice', e.target.value)}
                className={styles.colorInput}
              />


              duración de la tarjeta:
              <input
                type="text"
                value={card.duration}
                onChange={(e) => updateCard(index, 'duration', e.target.value)}
                placeholder="Duración"
                className={styles.input}
              />
            </div>

            <button
              type="button"
              onClick={() => removeCard(index)}
              className={styles.removeButton}
              disabled={config.cards.length === 1}
            >
              Eliminar tarjeta
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addCard}
          className={styles.addButton}
          disabled={config.cards?.length >= MAX_CARDS}
        >
          + Añadir tarjeta
        </button>
      </div>

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
        Imagen de fondo:
        <div className={styles.imageInputContainer}>
          <input
            type="text"
            value={config.image || ''}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="URL de la imagen"
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowGallery(!showGallery)}
            className={styles.galleryToggle}
          >
            {showGallery ? 'Cerrar Galería' : 'Abrir Galería'}
          </button>
        </div>
        {config.image && (
          <div className={styles.imagePreview}>
            <img
              src={config.image}
              alt="Vista previa"
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          </div>
        )}
      </label>

      <input
        type="text"
        value={config.buttonText}
        onChange={(e) => handleChange('buttonText', e.target.value)}
        placeholder="Texto del botón"
        className={styles.input}
      />

      <input
        type="color"
        value={config.buttonColor || '#007bff'}
        onChange={(e) => handleChange('buttonColor', e.target.value)}
        className={styles.colorInput}
      />


      {showGallery && (
        <div className={styles.galleryModal}>
          <ImageGallery onSelectImage={handleSelectImage} apiUrl={apiUrl} />
        </div>
      )}


    </>
  );
};

export default PricingConfigurator;