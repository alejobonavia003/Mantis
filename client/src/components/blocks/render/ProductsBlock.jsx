import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./styles/productsPromotion.module.css";
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const ProductsPromotionBlock = ({ configuration }) => {
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/productos`);
        const data = response.data;
        // Aseguramos que data sea un array; de lo contrario, array vacío
        const maxItems = configuration?.maxItems || 6;
        setProducts(Array.isArray(data) ? data.slice(0, maxItems) : []);
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    };
    fetchProducts();
  }, [configuration?.maxItems, apiUrl]);

  // Utilidad para detectar si un texto enriquecido está realmente vacío
  const isRichTextEmpty = (html) => {
    if (!html) return true;
    // Quita espacios, saltos de línea y minúsculas
    const clean = html.replace(/\s|\n|\r/g, '').toLowerCase();
    return (
      clean === '' ||
      clean === '<p><br></p>' ||
      clean === '<p></p>' ||
      clean === '<p><br/></p>' ||
      clean === '<p><br /></p>'
    );
  };

  return (
    <div
      className={styles.outerContainer}
    >
      <div className={styles.productsSection}>
        {/* Título */}
        {configuration?.titulo && (
          <div className={styles.productTitle} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(configuration.titulo)}}></div>
        )}

        {/* Top Content solo si hay texto1 o imagen */}
        {((!isRichTextEmpty(configuration?.texto1)) || configuration?.image) && (
          <div className={styles.topContent}>
            {/* Descripción con soporte para rich text */}
            {!isRichTextEmpty(configuration?.texto1) && (
              <div 
                className={styles.topText}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(configuration.texto1),
                }}
              />
            )}
            {/* Imagen */}
            {configuration?.image && (
              <div className={styles.topImage}>
                <img
                  src={configuration.image}
                  className={styles.imageLateral}
                />
              </div>
            )}
          </div>
        )}

        {/* Medium Content solo si hay texto2, texto3 o texto4 */}
        {((!isRichTextEmpty(configuration?.texto2)) )&& (
          <div className={styles.mediumContent}>
            {!isRichTextEmpty(configuration?.texto2) && (
              <div 
                className={styles.mediumText2}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(configuration.texto2),
                }}
              />
            )}

            {/* Cuadrante solo si hay texto3 o texto4 */}
            {((!isRichTextEmpty(configuration?.texto3)) || (!isRichTextEmpty(configuration?.texto4))) && (
              <div className={styles.cuadranProduct}>
                {!isRichTextEmpty(configuration?.texto3) && (
                  <div className={styles.leftColumn}>
                    <p
                      className={styles.text}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(configuration.texto3),
                      }}
                    />
                  </div>
                )}
                {!isRichTextEmpty(configuration?.texto4) && (
                  <div className={styles.rightColumn}>
                    <div className={styles.recuadro}>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(configuration.texto4),
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}


        {/* Tarjetas de productos */}
        <div className={styles.cardsContainer}>
          {products.map((product) => (
            <Link 
              to={`/productos/${product.id}`} 
              className={styles.cardWrapper} 
              style={{ textDecoration: 'none', color: 'inherit' }} // Opcional: elimina subrayado y mantiene colores
            >
              {/* Imagen con borde de 2px */}
              <div className={styles.productImageContainer}>
                <img
                  src={
                    product.galeria_imagenes && product.galeria_imagenes.length > 0
                      ? product.galeria_imagenes[0]
                      : '/img/placeholder.png' // imagen por defecto si no hay galería
                  }
                  alt={product.nombre}
                  className={styles.productImage}
                />
              </div>

              {/* Información: categoría, nombre, precio */}
              <div className={styles.productInfo}>
                {product.categoria && (
                  <p className={styles.productCategory} style={{ color: configuration?.textColor || '#555' }}>
                    {DOMPurify.sanitize(product.categoria)}
                  </p>
                )}
                <h3 className={styles.productTitle} style={{ color: configuration?.titleColor || '#333' }}>
                  {DOMPurify.sanitize(product.nombre)}
                </h3>
                <p className={styles.productPrice} style={{ color: configuration?.textColor || '#555' }}>
                  {`${product.precio}€`}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Botón principal HACER EL PEDIDO */}
        {configuration?.mainButtonText && (
          <div className={styles.mainButtonContainer}>

                    
                      <a
                        href={configuration?.mainButtonUrl || '#'}
                        className={styles.mainButton}
                        style={{
                          backgroundColor: configuration?.buttonColor ,
                          color: '#dfd8c7',
                        }}
                      >
                        {DOMPurify.sanitize(configuration.mainButtonText)}
                      </a>
                  
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPromotionBlock;
