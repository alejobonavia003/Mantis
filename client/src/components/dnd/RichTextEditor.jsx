import React, { useState, useEffect, useRef, forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Estilos de Quill

const RichTextEditor = forwardRef(({ value, onChange }, ref) => {
  const [editorValue, setEditorValue] = useState(value || '');
  const quillRef = useRef(null);

  // Sincronizamos cambios externos si value cambia
  useEffect(() => {
    setEditorValue(value || '');
  }, [value]);

  const handleChange = (content, delta, source, editor) => {
    setEditorValue(content);
    onChange(content);
  };

  // Configuración de la barra de herramientas
  const modules = {
    toolbar: [
      [{ header: "1" },{ header: "2" },{ header: "3" },{ header: "false" }], // Tamaños de encabezado
      ['bold', 'italic', 'underline', 'strike'], // Estilos de texto
      [{ list: 'ordered' }, { list: 'bullet' }], // Listas
      [{ indent: '-1' }, { indent: '+1' }], // Sangría
      [{ align: 'left' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }], // ✅ Opciones separadas de alineación
      [{ color: [] }, { background: [] }], // Colores
      ['link', 'image'], // Enlaces e imágenes
      ['blockquote', 'code-block'], // Citas y código
      ['clean'], // Eliminar formato
    ],
  };
  
  

  return (
    <ReactQuill
      ref={ref || quillRef} // Asigna la referencia de forma segura
      value={editorValue}
      onChange={handleChange}
      modules={modules}
      theme="snow"
    />
  );
});

export default RichTextEditor;
