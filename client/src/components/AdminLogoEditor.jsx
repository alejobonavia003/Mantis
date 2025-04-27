// LogoEditor.jsx
import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from './AdminImageGallery';


const LogoEditor = ({ logoUrl, loading, showGallery, onOpenGallery, onCloseGallery, onSelectImage }) => {
  return (
    <div className="logo-editor">
      <div className="logo-preview">
        <img src={logoUrl} alt="Logo" style={{ width: '200px', height: '200px' }} />
      </div>
      <div className="select-image-button-container">
        <button 
          onClick={onOpenGallery} 
          className="select-image-button"
          disabled={loading}
        >
          Abrir galería de imágenes
        </button>
        <button 
          onClick={onCloseGallery} 
          className="select-image-button"
          disabled={loading}
        >
          Cerrar galería de imágenes
        </button>
      </div>
      {showGallery && <ImageGallery onSelectImage={onSelectImage} />}
    </div>
  );
};

LogoEditor.propTypes = {
  logoUrl: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  showGallery: PropTypes.bool.isRequired,
  onOpenGallery: PropTypes.func.isRequired,
  onCloseGallery: PropTypes.func.isRequired,
  onSelectImage: PropTypes.func.isRequired,
};

export default LogoEditor;