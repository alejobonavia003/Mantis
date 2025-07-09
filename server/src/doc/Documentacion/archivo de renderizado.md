### ¿Qué es la carpeta `/render` dentro de los bloques?

La carpeta `/render` contiene los **componentes de renderizado** para cada tipo de bloque disponible en el sistema. Cada archivo dentro de esta carpeta (por ejemplo, HeroBlock.jsx, IconListBlock.jsx, etc.) define cómo se muestra visualmente el bloque en la página, utilizando la configuración que el usuario haya definido desde el panel de administración.

#### ¿Cómo funciona?

- **Renderizado visual:** Cada archivo exporta un componente React que recibe la configuración del bloque y la utiliza para mostrar el contenido (textos, imágenes, botones, colores, etc.) en el frontend.
- **Personalización dinámica:** El componente adapta su apariencia y contenido según los valores configurados por el usuario, permitiendo una visualización personalizada de cada bloque.
- **Separación de lógica:** El renderizado está separado de la lógica de configuración, lo que facilita el mantenimiento y la escalabilidad del sistema.
- **Extensible:** Para agregar un nuevo tipo de bloque visual, solo debes crear un nuevo archivo en `/render` siguiendo el patrón de los existentes y conectarlo en el sistema.

#### Ejemplo de uso

Si quieres que un bloque tenga una apariencia específica (por ejemplo, un hero con fondo, título, subtítulo y botones), defines esa estructura y estilos en su archivo de renderizado [[blockPreview]] dentro de `/render`. Así, cuando el bloque se muestra en la página, utiliza la configuración guardada y se visualiza exactamente como el usuario lo diseñó.

#### LLamas a la configuracion agregada en el back con la constante configutation 
por ej: configuration?.title te llama al campo llamado title si es que se agrego en el [[archivo de configuracion]] del bloque 

---

Esto permite que cada bloque tenga su propio componente visual, asegurando flexibilidad y coherencia en la presentación del contenido en todo el sitio.