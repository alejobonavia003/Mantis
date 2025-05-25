import React from 'react';
import HeroBlock from './render/HeroBlock';
import FeaturesBlock from './render/FeaturesBlock';
import CtaBlock from './render/CtaBlock';
import IconListBlock from './render/IconListBlock';
import styles from "./render/styles/homeRender.module.css";
import PricingBlock from './render/PricingBlock';
import HeroBlock2 from './render/HeroBlock2';
import PsychologistsBlock from './render/PsychologistsBlock';
import PsychologistsCarouselBlock from './render/PsychologistsCarouselBlock';
import ProductsPromotionBlock from './render/ProductsBlock';
import TurnosBlock from './render/TurnosBlock';
import FaqBlock from './render/FaqBlock';
import ImageListBlock from './render/ImageListBlock';
import TherapyBlock from './render/CuadranteBlock';
import PublicacionesBlock from './render/PublicacionesBlock'
import ComentariosBlock from './render/ComentariosBlock';
import PasoAPasoBlock from './render/PasoAPasoBlock';
import PreguntasLargasBlock from './render/PreguntasLargasBlock';
import RolDelTerapeutaBlock from './render/RolDelTerapeutaBlock';
import MaterialRequestBlock from './render/MaterialRequestBlock';
import QuadranteImageBlock from './render/QuadranteImageBlock';


const BlockPreview = ({ block }) => {
  if (!block || !block.type) return <div>Vista previa no disponible</div>;

  // Agregar animación con la clase "fadeIn"
  const containerClass = `${styles.blockContainer} ${styles.fadeIn}`;

  switch (block.type) {
    case 'hero':
      return (
        <div className={containerClass}>
          <HeroBlock configuration={block.configuration} />
        </div>
      );

    case 'hero2':
      return (
        <div className={containerClass}>
          <HeroBlock2 configuration={block.configuration} />
        </div>
      );
    case 'features':
      return (
        <div className={containerClass}>
          <FeaturesBlock configuration={block.configuration} />
        </div>
      );

    case 'cta':
      return (
        <div className={containerClass}>
          <CtaBlock configuration={block.configuration} />
        </div>
      );
    case 'iconList':
      return (
        <div className={containerClass}>
          <IconListBlock configuration={block.configuration} />
        </div>
      );
    case 'pricingCards':
      return (
        <div className={containerClass}>
          <PricingBlock configuration={block.configuration} />
        </div>
      );
    case 'psychologists':
      return (
        <div className={containerClass}>
          <PsychologistsBlock configuration={block.configuration} />
        </div>
      );
    case 'psychologistsCarousel':
      return (
        <div className={containerClass}>
          <PsychologistsCarouselBlock configuration={block.configuration} />
        </div>
      );
    case 'productsPromotion':
      return (
        <div className={containerClass}>
          <ProductsPromotionBlock configuration={block.configuration} />
        </div>
      );
    case 'terapiaDijital':
      return (
        <div className={containerClass}>
          <TurnosBlock configuration={block.configuration} />
        </div>
      );
    case 'questionBlock':
      return (
        <div className={containerClass}>
          <FaqBlock configuration={block.configuration} />
        </div>
      );
    case 'imageList':
      return (
        <div className={containerClass}>
          <ImageListBlock configuration={block.configuration} />
        </div>
      );
    case 'therapy':
      return (
        <div className={containerClass}>
          <TherapyBlock configuration={block.configuration} />
        </div>
      );
    case 'publicaciones':
      return (
        <div className={containerClass}>
          <PublicacionesBlock configuration={block.configuration} />
        </div>
      );
    case 'comentarios': 
    return (
      <div className={containerClass}>
        <ComentariosBlock configuration={block.configuration} />
      </div>
    );
    case 'pasoapaso': 
    return (
      <div className={containerClass}>
        <PasoAPasoBlock configuration={block.configuration} />
      </div>
    );
    case 'preguntaslargas': 
    return (
      <div className={containerClass}>
        <PreguntasLargasBlock configuration={block.configuration} />
      </div>
    );
    case 'roldelterapeuta': 
    return (
      <div className={containerClass}>
        <RolDelTerapeutaBlock configuration={block.configuration} />
      </div>
    );
    case 'materialRequest': 
    return (
      <div className={containerClass}>
        <MaterialRequestBlock configuration={block.configuration} />
      </div>
    );
    case 'imageQuadrants':
    return (
      <div className={containerClass}>
        <QuadranteImageBlock configuration={block.configuration} />
      </div>
    );
    default:
      return <div className={containerClass}>Vista previa no disponible</div>;
  }
};

export default BlockPreview;
