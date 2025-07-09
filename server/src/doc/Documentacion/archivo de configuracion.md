
### ¿Qué es la carpeta `/config` dentro de los bloques?

La carpeta `/config` contiene los **componentes de configuración** para cada tipo de bloque disponible en el sistema. Cada archivo dentro de esta carpeta (por ejemplo, HeroConfigurator.jsx, IconListConfigurator.jsx, etc.) define el formulario y la lógica necesarios para editar las propiedades específicas de ese bloque desde el panel de administración.

#### ¿Cómo funciona?

- **Formulario dinámico:** Cada archivo exporta un componente React que muestra los campos editables del bloque (textos, colores, imágenes, botones, etc.).
- **Vinculación con el estado:** Los campos del formulario están conectados al estado de configuración del bloque. Cuando el usuario edita un campo, el componente actualiza la configuración correspondiente.
- **Personalización visual:** Permite que el administrador ajuste fácilmente el contenido y el estilo de cada bloque sin tocar el código fuente.
- **Extensible:** Para agregar un nuevo tipo de bloque configurable, solo debes crear un nuevo archivo en `/config` siguiendo el patrón de los existentes y conectarlo en el `BlockConfigurator` [[blockConfigurator]].

#### Ejemplo de uso

Si quieres que un bloque tenga campos personalizados (por ejemplo, título, subtítulo, color de fondo, imagen, etc.), defines esos campos en su archivo de configuración dentro de `/config`. Así, cuando el bloque se edita en el panel, el usuario ve un formulario amigable y específico para ese bloque.

---

Esto permite que la edición y personalización de los bloques sea modular, escalable y mantenible.