import { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = ({ onSelectImage }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/upload`);
      // Se espera un array de objetos { url, public_id }
      setImages(response.data);
    } catch (error) {
      console.error("Error al cargar imágenes:", error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      const response = await axios.post(`${apiUrl}api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Ahora response.data es un objeto { url, public_id }
      setImages(prev => [...prev, response.data]);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error al subir imagen:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (public_id) => {
    if (
      window.confirm(
        "¿Estás seguro de eliminar esta imagen? Esto puede tardar hasta 10 segundos. Recuerda que tienes un límite de 10 imágenes eliminadas por día."
      )
    ) {
      try {
        const cleanPublicId = public_id.replace('Mantis-APP/', '');
        await axios.delete(`${apiUrl}api/upload/${cleanPublicId}`);
        fetchImages();
      } catch (error) {
        if (error.response && error.response.status === 429) {
          alert("Has alcanzado el límite de 10 imágenes eliminadas por día.");
        } else {
          console.error("Error al eliminar imagen:", error);
        }
      }
    }
  };

  return (
    <div className="galleryContainer">
      <h2>Galería de Imágenes</h2>
      <div className="uploadSection">
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button onClick={handleUpload} disabled={uploading || !selectedFile}>
          {uploading ? 'Subiendo...' : 'Subir Imagen'}
        </button>
      </div>
      <div className="imagesGrid">
        {images.map((image, index) => (
          <div key={index} className="imageItem">
            <img
              src={image.url}
              alt={`imagen-${index}`}
              onClick={() => onSelectImage(image)}
              className="galleryImage"
            />
            <button onClick={() => handleDelete(image.public_id)} className="deleteButton">
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;