// SingleProduct.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { ShoppingCart } from 'lucide-react';
import MaterialRequestBlock from '../components/blocks/render/MaterialRequestBlock';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showpedido, setShowpedido] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/productos/${id}`);
        setProduct(response.data);
        const firstImage = response.data.galeria_imagenes?.[0] || '/img/placeholder.png';
        setCurrentImage(firstImage);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };
    fetchProduct();
  }, [id, apiUrl]);

  if (!product) return <div className="loading">Cargando producto...</div>;

  const { galeria_imagenes = [] } = product;

  const openModal = () => setShowForm(false) || setZoomed(false) || setShowForm(true);
  const closeModal = () => { setShowForm(false); setZoomed(false); };
  const portada = galeria_imagenes?.[0] || '/img/placeholder.png';

  return (
    <div className="totalContainer">
      <div className="singleProductContainer">
        {/* Encabezado */}
        <div className="productHeader">
          <div className="portada gallery">
            <div className="mainImage" onClick={() => setShowForm(true)}>
              <img
                src={currentImage}
                alt={product.nombre}
                className={zoomed ? 'zoomed' : ''}
                onClick={() => setZoomed(z => !z)}
              />
            </div>
            <div className="thumbnails">
              {galeria_imagenes.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Thumb ${i}`}
                  className={url === currentImage ? 'thumbnailActive' : 'thumbnail'}
                  onClick={() => setCurrentImage(url)}
                />
              ))}
            </div>
          </div>
          <div className="productInfo">
            <h1 className="title">{DOMPurify.sanitize(product.nombre)}</h1>
            <div
              className="shortDescription"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.descripcion_corta) }}
            />
          </div>
        </div>

        {/* Precio destacado */}
        <div className="productPrice highlightedPrice">
          <ShoppingCart className="icon" />
          <span>Inversión: €{product.precio}</span>
        </div>

        {/* Botón de pedido */}
        <div className="orderButtonContainer">
          <button className="orderButton" onClick={() => setShowpedido(true)}>
            <ShoppingCart className="icon" /> Hacer el Pedido
          </button>
        </div>

        {/* imagenes */}
        {showForm && (
          <div className="imageModalProduct" onClick={closeModal}>
            <div className="modalContentProduct">
              <img src={currentImage} alt="Imagen ampliada" className={zoomed ? 'zoomed' : ''} />
            </div>    
          </div>
        )}
              {/* Formulario */}
              {showpedido && (
        <MaterialRequestBlock
          configuration={{ backgroundColor: '#f9f9f9', sideImage: portada }}
        />
      )}

        {/* Sección detalles */}
        <div className="detailsSection">
          <div
            className="longDescription highlightedDescription"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.descripcion_larga) }}
          />
        </div>

        {/* Aviso digital */}
        <p className="digitalProductNotice highlightedNotice">
          Este es un producto digital, se envía en formato .pdf
        </p>
      </div>
    </div>
  );
}

export default SingleProduct;