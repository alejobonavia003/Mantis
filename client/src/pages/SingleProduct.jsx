import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import MaterialRequestBlock from '../components/blocks/render/MaterialRequestBlock'; // Importa el formulario

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/productos/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };
    fetchProduct();
  }, [id, apiUrl]);

  if (!product) {
    return <div className="loading">Cargando producto...</div>;
  }

  const { galeria_imagenes } = product;
  const portada = galeria_imagenes && galeria_imagenes.length > 0 ? galeria_imagenes[0] : '/img/placeholder.png';
  const otrasImagenes = galeria_imagenes && galeria_imagenes.length > 1 ? galeria_imagenes.slice(1) : [];

  return (
    <div className="totalContainer">
      <div className="singleProductContainer">
        {/* Portada e información del producto */}
        <div className="productHeader">
          {/* Imagen de portada */}
          <div className="portada">
            <img src={portada} alt={product.nombre} className="portadaImage" />
          </div>

          {/* Título y descripción corta */}
          <div className="productInfo">
            <h1 className="title">{DOMPurify.sanitize(product.nombre)}</h1>
            <div
              className="shortDescription"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.descripcion_corta || ''),
              }}
            />
          </div>
        </div>

        {/* Precio */}
        <div className="productPrice">
          <p className="price">€{product.precio}</p>
        </div>

        {/* Otras imágenes */}
        {otrasImagenes.length > 0 && (
          <div className="otherImages">
            {otrasImagenes.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Imagen ${idx + 2}`}
                className="otherImage"
                onClick={() => setSelectedImage(imgUrl)} // Al hacer clic, se selecciona la imagen
              />
            ))}
          </div>
        )}

        {/* Botón para hacer el pedido */}
        <div className="orderButtonContainer">
          <button className="orderButton" onClick={() => setShowForm(true)}>
            Hacer el Pedido
          </button>
        </div>

        {/* Formulario de solicitud de material */}
        {showForm && (
          <MaterialRequestBlock
            configuration={{
              backgroundColor: '#f9f9f9',
              sideImage: portada,
            }}
          />
        )}

        {/* Descripción larga */}
        <div className="detailsSection">
          <div
            className="longDescription"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.descripcion_larga || ''),
            }}
          />
        </div>
        <p className="digitalProductNotice">
          Este es un producto digital, se envía en formato .pdf
        </p>
      </div>

      {/* Modal para la imagen seleccionada */}
      {selectedImage && (
        <div className="imageModalProduct" onClick={() => setSelectedImage(null)}>
          <div className="modalContentProduct">
            <img src={selectedImage} alt="Imagen ampliada" />
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProduct;