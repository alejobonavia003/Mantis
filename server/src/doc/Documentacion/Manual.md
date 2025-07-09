## Menu
[[Como crear un nuevo bloque]]
[[Como registrar una nueva pagina]]


### Documentacion general
### Estructura general del frontend

- **`src/`**  
  Carpeta principal del código fuente de la aplicación React.

---

### Componentes principales

- **`components/`**  
  Contiene todos los componentes reutilizables y específicos del sistema.
  - **`blocks/`**  
    - **blockTypes.config.js**: Define los tipos de bloques disponibles y su configuración por defecto.
    - **`/config`**: Formularios de configuración de cada bloque (para editar desde el panel de administración).
    - **`/render`**: Componentes que renderizan visualmente cada bloque en la web.
    - **BlockConfigurator.jsx**: Renderiza el formulario adecuado para editar cada bloque.
    - **BlockPreview.jsx**: Muestra la vista previa de cada bloque según su configuración.
    - **SortableBlock.jsx**: Permite reordenar bloques mediante drag & drop.
  - **AdminPageEditor.jsx**  
    Editor visual de páginas, permite agregar, ordenar y editar bloques.
  - **`AdminSidebar.jsx`**  
    Barra lateral de navegación del panel de administración.
  - **AdminBlockLibrary.jsx**  
    Biblioteca de bloques disponibles para agregar a las páginas.
  - **`AdminImageGallery.jsx`**  
    Galería de imágenes para seleccionar y cargar imágenes en los bloques.
  - **Otros componentes de administración**  
    Como `AdminProducts.jsx`, `AdminPsRegister.jsx`, `MetricsPanel.jsx`, para gestionar productos, psicólogos y métricas respectivamente.

---

### Páginas

- **`pages/`**  
  Contiene las páginas principales del sistema (por ejemplo, `Admin.jsx`, etc.), que suelen usar los componentes y bloques definidos en `components/`.

---

### Assets y Estilos

- **`assets/`**  
  Imágenes, íconos y otros recursos estáticos utilizados en la aplicación.
- **`styles/`**  
  Estilos globales y específicos, organizados por componentes y páginas.  
  Incluye variables de colores, mixins y estilos responsivos.

---

### Configuración y Entradas

- **`index.html`**  
  Archivo base HTML donde se monta la app de React.
- **`main.jsx`**  
  Punto de entrada de la aplicación React.
- **`vite.config.js`**  
  Configuración de Vite para el build y desarrollo.
- **`.env.*`**  
  Variables de entorno para desarrollo y producción.

---

### Buenas prácticas para documentar

- Explica la función de cada carpeta y archivo clave.
- Describe cómo funciona el editor visual y cómo se conectan los bloques.
- Documenta la estructura de estilos y cómo agregar nuevos estilos.
- Indica cómo se gestionan los assets y cómo referenciarlos en los bloques.
- Si tienes lógica de autenticación, rutas protegidas o manejo de roles, documenta cómo funciona.

---
