
### ¿Qué es blockTypes.config.js?

El archivo blockTypes.config.js define y centraliza la configuración de todos los tipos de bloques reutilizables que pueden usarse en el constructor de páginas del proyecto. Cada bloque representa una sección o componente visual (por ejemplo: héroe, lista de iconos, tarjetas de precios, preguntas frecuentes, etc.) y contiene su configuración por defecto, descripción, nombre, ícono y las propiedades que pueden ser personalizadas desde el panel de administración.

#### ¿Cómo funciona?

- **Definición de bloques:** Cada entrada del objeto `blockTypes` representa un tipo de bloque disponible en el sistema.
- **Configuración por defecto:** Dentro de cada bloque, la propiedad `defaultConfig` establece los valores iniciales y las opciones editables (colores, textos, imágenes, botones, etc.).
- **Personalización:** Cuando un usuario agrega un bloque a una página, se parte de esta configuración por defecto, pero puede modificarla desde el panel de administración.
- **Extensibilidad:** Para agregar un nuevo tipo de bloque, solo es necesario añadir una nueva entrada en este archivo con su configuración y propiedades.

#### Ejemplo de uso

Cuando el sistema necesita renderizar una página, consulta este archivo para saber qué bloques existen, cómo se llaman, qué opciones tienen y cómo deben lucir inicialmente. Así, el frontend puede mostrar formularios de edición dinámicos y renderizar cada bloque según su configuración.

---

Esto permite mantener la estructura de los bloques centralizada, facilitar la edición y asegurar la coherencia visual y funcional en todo el sitio.