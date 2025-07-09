
### Como funciona el sistema de Bloques de mantis
dentro de la seccion de administracion de la web hay una seccion "edicion de pagina" que nos va a permitir poder agregarl, eliminar y editar bloques, ademas de que se va a poder arrastrar bloques para ubicarlos.

todas las secciones de la web trabajan por bloques exepto los perfiles de psicologas y productos. esto es para que pueda ser modificable cada seccion de la web

entonces cada vez que vallamos a crear un bloque vamos a pensar que va a ser modificable por el back y solo permitir modificar esas cosas, luego el bloque se podra usar la cantidad de veces que sea nesesario

## paso 1 
Crear el diseño del bloque 
* se decide que se va a poder modificar desde el back de la web 
* se decide como va a ser la parte visual del bloque 
## paso 2
*  en el archivo `/client/src/components/blocks/blockTypes.config.js` se le agrega la configuracion que va a tener por defecto el bloque
* [[BlockType.config]]
## paso 3
 * en la carpeta config vamos a crear el [[archivo de configuracion]]
 * luego en la carpeta render vamos a crear el [[archivo de renderizado]]

## paso 4
* luego registramos el bloque en el back y en el front 
* dentro de [[blockPreview]] registramos el componente que maneja el front del bloque `/Mantis/client/src/components/blocks/BlockPreview.jsx` "lo que hacemos es importar el nuevo archivo de render y creamos un nuevo case : " nombre del bloque" y que cuando entre en ese caso se cargue el archivo importado "
* dentro de [[blockConfigurator]] registramos la configuracion del bloque " para agregar una configuracion nueva importamos el archivo de config y luego creamos una condicion nueva de que cuando toque ese nombre de bloque se cargue el archivo importado" 

## paso 5 
* por ultimo registramos el nombre del archivo de renderizado(nombre del bloque que esta en render) en `server/routes/blockRoutes.mjs` ayi se encuentra una constante con todos los nobres esto es para que cuando nesesitemos saber el nobre del archivo lo podamos ven en el back  
