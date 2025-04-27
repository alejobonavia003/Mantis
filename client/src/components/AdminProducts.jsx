import { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from './AdminImageGallery'; // Importa la galería de imágenes
import RichTextEditor from './dnd/RichTextEditor'; // Importa el componente RichTextEditor

// Obtiene la URL base de la API desde la variable de entorno
const apiUrl = import.meta.env.VITE_API_URL;

const AdminProducts = () => {
  const [form, setForm] = useState({ 
    nombre: "", 
    descripcion_corta: "", 
    descripcion_larga: "", 
    precio: "", 
    galeria_imagenes: [], 
    categoria: "", 
    stock: 0 
  });
  const [productos, setProductos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showGallery, setShowGallery] = useState(false); // Estado para mostrar la galería

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get(apiUrl + "api/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${apiUrl}api/productos/${editId}`, form);
      } else {
        await axios.post(apiUrl + "api/productos", form);
      }
      setForm({ 
        nombre: "", 
        descripcion_corta: "", 
        descripcion_larga: "", 
        precio: "", 
        galeria_imagenes: [], 
        categoria: "", 
        stock: 0 
      });
      setEditId(null);
      fetchProductos();
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };

  const handleEdit = (producto) => {
    setForm(producto);
    setEditId(producto.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}api/productos/${id}`);
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectImage = (image) => {
    setForm(prev => ({
      ...prev,
      galeria_imagenes: [...prev.galeria_imagenes, image.url]
    }));
  };

  return (
    <div className="product-container">
      <h2 className="product-title">{editId ? "Editar Producto" : "Agregar Producto"}</h2>
  
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="product-input"
        />
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
          required
          className="product-input"
        />
  
        {/* Descripción corta con RichTextEditor */}
        <label className="product-label">
          Descripción corta:
          <RichTextEditor
            value={form.descripcion_corta || ''}
            onChange={(content) => setForm({ ...form, descripcion_corta: content })}
          />
        </label>
  
        {/* Descripción larga con RichTextEditor */}
        <label className="product-label">
          Descripción larga:
          <RichTextEditor
            value={form.descripcion_larga || ''}
            onChange={(content) => setForm({ ...form, descripcion_larga: content })}
          />
        </label>
  
        <div className="product-image-container">
          <div className="product-gallery-preview">
            {form.galeria_imagenes.map((img, index) => (
              <div key={index} className="product-gallery-item">
                <img src={img} alt={`Preview`} />
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      galeria_imagenes: prev.galeria_imagenes.filter((_, i) => i !== index),
                    }))
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowGallery(true)}
            className="product-btn product-btn-gallery"
          >
            Agregar Imágenes
          </button>
        </div>
  
        <input
          type="text"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Categoría"
          className="product-input"
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
          className="product-input"
        />
        <button type="submit" className="product-btn product-btn-submit">
          {editId ? "Actualizar" : "Agregar"} Producto
        </button>
      </form>
  
      {/* Tabla de Productos */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción Corta</th>
            <th>Descripción Larga</th> {/* Nueva columna */}
            <th>Imagen</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>
                <div
                  onClick={() => toggleDescription(producto.id)}
                  style={{ cursor: "pointer" }}
                >
                  {expandedDescriptions[producto.id]
                    ? producto.descripcion_corta
                    : `${producto.descripcion_corta.substring(0, 50)}...`}
                </div>
              </td>
              <td>
                <div
                  onClick={() => toggleDescription(`long-${producto.id}`)} // Usamos un identificador único para la descripción larga
                  style={{ cursor: "pointer" }}
                >
                  {expandedDescriptions[`long-${producto.id}`]
                    ? producto.descripcion_larga
                    : `${producto.descripcion_larga.substring(0, 50)}...`}
                </div>
              </td>
              <td>
                {producto.galeria_imagenes?.length > 0 && (
                  <img
                    src={producto.galeria_imagenes[0]}
                    alt={producto.nombre}
                    className="product-img"
                  />
                )}
              </td>
              <td>{producto.categoria}</td>
              <td>{producto.stock}</td>
              <td>
                <button
                  onClick={() => handleEdit(producto)}
                  className="product-btn product-btn-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(producto.id)}
                  className="product-btn product-btn-delete"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Muestra la galería cuando showGallery es true */}
      {showGallery && <ImageGallery onSelectImage={handleSelectImage} />}
    </div>
  );
};

export default AdminProducts;