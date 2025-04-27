// blockTypes.config.js🔧
export const blockTypes = {
  hero: {
    name: 'Hero',
    description: 'Titulo con descripcion y 3 botones centrados',
    icon: '🖼️',
    defaultConfig: {
      title: 'Título principal',
      subtitle: 'Subtítulo descriptivo',
      backgroundColor: '#F7EFCB',
      image: '',
      blobs: [], // Array para almacenar múltiples manchas
      buttonText1: 'Ver más',
      buttonUrl1: '#',
      buttonColor1: '#007bff',
      buttonText2: 'Ver más',
      buttonUrl2: '#',
      buttonColor2: '#007bff',
      buttonText3: 'Ver más',
      buttonUrl3: '#',
      buttonColor3: '#007bff',
    }
  },
  hero2: {
    name: 'hero-2',
    description: 'Titulo con descripcion, imagen y 2 botones',
    icon: '🖼️',
    defaultConfig: {
      title: 'Título principal',
      subtitle: 'Subtítulo descriptivo',
      backgroundColor: '#ffffff',
      image: '',
      fondo: '',
      buttonText1: 'Ver más',
      buttonUrl1: '#',
      buttonColor1: '#007bff',
      buttonText2: 'Ver más',
      buttonUrl2: '#',
      buttonColor2: '#007bff'
    }
  },
  cta: {
    name: 'LLamado a la acción',
    description: 'Botón destacado para conversión',
    icon: '📢',
    defaultConfig: {
      text: '¡Empieza ahora!',
      url: '#'
    }
  },
  iconList: {
    name: 'Lista con Iconos',
    description: 'Lista numerada con imágenes personalizadas cíclicas',
    icon: '🔢',
    defaultConfig: {
      backgroundColor: '#ffffff',
      items: [],
      icons: [],
      titulo: 'Título de la lista',
      description: 'Descripción de la lista',
      description2: 'Descripción de la lista',
      description3: 'Descripción de la lista',
      buttonText1: 'Ver más',
      buttonUrl1: '#',
      buttonColor1: '#007bff'
    }
  },
  pricingCards: {
    name: 'Tarjetas de Precios',
    description: 'Muestra hasta 3 tarjetas de precios con botones personalizables',
    image: '',
    icon: '💰',
    defaultConfig: {
      title: 'Nuestros Planes',
      cards: [
        {
          title: 'Sesión Inicial',
          price: '25€',
          duration: 'Duración 20min',
          buttonText: 'Reserva ahora',
          buttonColor: '#007bff',
          cardBackground: '#ffffff',
          colorPrice: '#75aca8',
        }
      ],
      backgroundColor: '#ffffff'
    }
  },
  psychologists: {
    name: 'Presentación Psicólogos',
    description: 'Muestra psicólogos con formato alternado',
    icon: '👥',
    defaultConfig: {
      backgroundColor: '#ffffff',
      titleColor: '#333333',
      textColor: '#666666',
      buttonText: 'Conocer más',
      buttonColor: '#007bff',
      buttonTextColor: '#ffffff',
      maxItems: 6
    }
  },
  psychologistsCarousel: {
    name: 'Carrusel Psicólogos',
    description: 'Muestra psicólogos en formato carrusel con botones',
    icon: '👥',
    image: '',
    descripcion: '',
    titulo: "titulo",
    defaultConfig: {
      backgroundColor: '#ffffff',
      buttonColor: '#007bff',
      buttonTextColor: '#ffffff',
      mainButtonText: 'Conoce nuestro equipo',
      mainButtonUrl: '/nosotros',
      mainButtonColor: '#007bff',
      maxItems: 4,
    }
  },
  productsPromotion: {
    name: 'Promoción de Productos',
    description: 'Muestra productos promocionados con su información básica y un botón principal',
    icon: '🛍️',
    image: '',
    descripcion: 'Sección para promocionar productos seleccionados de la base de datos.',
    titulo: 'Productos Destacados',
    defaultConfig: {
      titulo: 'Materiales de autoayuda para tu crecimiento personal ',
      texto1: '¿Para qué te pueden servir? ',
      texto2: 'Estos materiales te ayudarán a saber más sobre tí y poner en práctica lo aprendido, te proponen herramientas de auto-ayuda que ofrecen, desde preguntas que invitan a la reflexión hasta ejercicios arte-terapéuticos útiles para tu desarrollo personal.',
      texto3: 'Si ya haces terapia, puedes profundizar lo aprendido en tu proceso con los ejercicios que te propone cada material, según el tema que más te interese.',
      texto4: 'También, si eres psicólogo, éstos materiales de auto-ayuda pueden ser útiles para conocer más recursos al momento de ayudar a tus pacientes a comprender ciertos conceptos.',
      image: '',
      buttonColor: '',
      mainButtonText: '',
      mainButtonUrl: ''
    }
  },
  terapiaDijital: {
    name: 'Terapia dijital',
    description: 'Muestra el formulario para reservar una sesión de terapia',
    icon: '📅',
    image: '',
    titulo: 'Productos Destacados',
    defaultConfig: {
      backgroundColor: '#f8f8f8',
      sideImage: '#333333',
      mainButtonText: '',
    }
  },
  questionBlock: {
    name: 'Preguntas Frecuentes',
    description: 'Bloque de preguntas frecuentes con imagen lateral y color de fondo configurable.',
    icon: '❓',
    defaultConfig: {
      backgroundColor: '#F7EFCB',  // Ejemplo de color base
      sideImage: '',
      faqs: [
        {
          question: '¿Cómo es la terapia online?',
          answer: '<p>La terapia online es ...</p>'
        },
        {
          question: '¿Qué sucede después de la primera sesión?',
          answer: '<p>Después de la primera sesión ...</p>'
        }
      ]
    }
  },
  imageList: {
    name: 'Imagen y Lista con Iconos',
    description: 'Dos columnas con imagen y lista de items con iconos',
    icon: '✅',
    defaultConfig: {
      title: 'La terapia online es para ti si:',
      image: '',
      subtitle: '',
      botomtext: '',
      items: [
        { icon: '', text: 'Necesitas flexibilidad horaria.' },
        // ... más items inicialess
      ],
      buttonText1: 'Reserva una sesión',
      buttonUrl1: '#turnos',
      buttonColor1: '#618E7E',
      backgroundColor: '#ffffff',
      buttonText2: 'Reserva una sesión',
      buttonUrl2: '#turnos',
      buttonColor2: '#618E7E',
    }
  },
  therapy: {
    name: 'bloque de información de en cuadrantes',
    description: 'Bloques intercalados con detalles alrededor',
    icon: '🧠',
    defaultConfig: {
      title: 'Hacer terapia es',
      subtitle1: "Subtitle 1",
      subtitle2: "Subtitle 2",
      subtitle3: "Subtitle 3",
      subtitle4: "Subtitle 4",
      backgroundColor: '#F7EFCB',
      blobs: [],
    }
  },
  materialRequest: {
    name: 'Solicitud de Material',
    description: 'Formulario para solicitar materiales de auto-ayuda',
    icon: '📄',
    defaultConfig: {
      title: 'Solicita tu material de auto-ayuda',
      backgroundColor: '#f8f8f8',
      sideImage: '',
      buttonText: 'Enviar',
      buttonColor: '#007bff',
    },
  },
  publicaciones: {
    name: 'Publicaciones',
    description: 'Muestra 5 publicaciones con un título y un botón final',
    icon: '🖼️',
    defaultConfig: {
      title: 'Mira nuestras publicaciones',
      posts: [
        { image: '', url: '', isReel: false },
        { image: '', url: '', isReel: false },
        { image: '', url: '', isReel: false },
        { image: '', url: '', isReel: false },
        { image: '', url: '', isReel: false },
      ],
      buttonText: 'Ver más',
      buttonUrl: '#',
      buttonColor: '#007bff',
      buttonText2: 'Ver más',
      buttonUrl2: '#',
      buttonColor2: '#007bff',

    },
  },
  comentarios: {
    name: 'Comentarios',
    descripcion: 'un titulo descripcion y bloque de comentarios y un boton',
    icon: '👥',
    defaultConfig: {
      title: 'Iniciar un proceso terapéutico online…',
      description: 'Tomar la decisión de iniciar terapia lleva tiempo, implica un proceso de altos y bajos emocionales que, en su transitar, te permitirá encontrar nuevos significados sobre lo que te está generando malestar y así podrá aliviar el dolor.',
      buttonText: '',
      buttonUrl: '#',
      buttonColor: '#007bff',
    }
  },
  pasoapaso: {
    name: 'como reservar una sesión',
    descripcion: 'una descripcion y un bloque de pasos y un boton',
    icon: '🔢',
    defaultConfig: {
      description: 'Es entendible si sientas miedo o incertidumbre antes de empezar terapia online, aquí te explicaremos de qué se trata la terapia online y cómo puedes reservar una sesión:',
      steps: [
        { image: '', description: 'Rellena el formulario' },
        { image: '', description: 'La psicóloga se pondrá en contacto contigo en un plazo de 24 horas laborales por whatsapp o correo electrónico' },
        { image: '', description: 'Coordinaremos el día y horario de la sesión ' },
        { image: '', description: 'Te informaremos sobre los medios de pago para dejar reservado el turno ' },
      ],
      buttonText: '',
      buttonUrl: '#',
      buttonColor: '#007bff',
      buttonText2: '',
      buttonUrl2: '#',
      buttonColor2: '#007bff',
    }
  },
  preguntaslargas: {
    name: 'bloque de información',
    descripcion: 'responde dos preguntas largas con informacino en cuadrantes y un boton',
    icon: '🧠',
    defaultConfig: {
      pregunta1: '¿Cómo prepararte para hacer terapia online? ',
      recuadro: 'Es necesario que dispongas de celular, computadora o Tablet y acceso a internet. También puedes tener una libreta y lápiz por si quieres hacer anotaciones durante la sesión.',
      parrafo1: 'Sugerimos que te encuentres en un lugar privado, cómodo en el que puedas concentrarte, sin distracciones como ruidos y personas alrededor, para que puedas hablar libremente. ',
      parrafo2: 'Que tengas temores por iniciar terapia, dudas o frenos es completamente entendible. Y no te preocupes por esto, ya que siendo profesionales de salud comprendemos esas sensaciones.',
      pregunta2: '¿Qué sucede en la primera sesión?',
      parrafo3: 'La primera sesión tiene una duración aproximada de 60-95 minutos, será principalmente para conocernos y contar libremente tu motivo de consulta.  Nos encontraremos a través de Google Meet o Zoom.',
      parrafo4: 'Tu psicóloga recogerá la información y en conjunto plantearemos los objetivos terapéuticos. También puedes aclarar las dudas que tengas.  ',
      parrafo5: 'La primera sesión te servirá para valorar si te has sentido bien con tu psicóloga, si es así, podrás pautar tus próximas sesiones semanales o quincenales.',
      buttonText: 'solicitar una sesión',
      buttonUrl: '#',
      buttonColor: '#516f61',
      buttonText2: '¡Quiero empezar ya!',
      buttonUrl2: '#',
      buttonColor2: '#516f61',
      buttonText3: 'Despeja tus dudas',
      buttonUrl3: '#',
      buttonColor3: '#dfd8c7',
    }
  },
    roldelterapeuta: {
    name: 'Rol del terapeuta',
    descripcion: 'Título, descripción y pautas en columnas',
    icon: '👥',
    defaultConfig: {
      titulo: 'En Mantis nos parece de suma importancia informar sobre el rol que debe desempeñar el terapeuta durante el tratamiento, para que los pacientes tomen conocimiento de la ética profesional.',
      descripcion: 'Es por eso que, a continuación, te compartimos algunas pautas sobre lo que debe y no debe hacer un terapeuta cuando brinda tratamiento.',
      practices: [
        { text: 'Ejemplo de buena práctica', type: 'good' },
        { text: 'Ejemplo de mala práctica', type: 'bad' },
      ],
    },
  },
  };