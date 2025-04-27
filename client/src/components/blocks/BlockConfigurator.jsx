import { useState, useEffect } from 'react';
import styles from './render/styles/configuratorBlock.module.css';
import HeroConfigurator from './config/HeroConfigurator';
import IconListConfigurator from './config/IconListConfigurator';
import PricingConfigurator from './config/PricingConfigurator';
import ProductsPromotionConfigurator from './config/ProductsConfigurator';
import Hero2Configurator from './config/Hero2Configurator';
import PsychologistsConfigurator from './config/PsychologistsConfigurator';
import PsychologistsCarouselConfigurator from './config/PsychologistsCarouselConfigurator';
import TurnosConfigurator from './config/TurnosConfigurator';
import FaqConfigurator from './config/FaqConfigurator';
import ImageListConfigurator from './config/ImageListConfigurator';
import TherapyConfigurator from './config/CuadranteConfigurator';
import PublicacionesConfigurator from './config/PublicacionesConfigurator';
import ComentariosConfigurator from './config/ComentariosConfigurator';
import PasoAPasoConfigurator from './config/PasoAPasoConfigurator';
import PreguntasLargas from './config/PreguntasLargasConfigurator';
import RolDelTerapeutaConfigurator from './config/RolDelTerapeutaConfigurator';
import MaterialRequestConfigurator from './config/MaterialRequestConfigurator'

const BlockConfigurator = ({ block, onUpdate }) => {
  const [config, setConfig] = useState(block.configuration);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Actualiza el estado local si cambia el bloque
  useEffect(() => {
    setConfig(block.configuration);
  }, [block.configuration]);

  // Actualiza el estado local sin disparar onUpdate aún
  const handleChange = (field, value) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
  };

  // Al presionar guardar, se envían todos los cambios
  const handleSave = () => {
    onUpdate(config);
  };

  return (
    <div className={styles.configForm}>
      {block.type === 'hero' && (
        <HeroConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'hero2' && (
        <Hero2Configurator config={config} onChange={handleChange} />
      )}
      {block.type === 'iconList' && (
        <IconListConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'pricingCards' && (
        <PricingConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'psychologists' && (
        <PsychologistsConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'psychologistsCarousel' && (
        <PsychologistsCarouselConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'productsPromotion' && (
        <ProductsPromotionConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'terapiaDijital' && (
        <TurnosConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'questionBlock' && (
        <FaqConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'imageList' && (
        <ImageListConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'therapy' && (
        <TherapyConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'publicaciones' && (
        <PublicacionesConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'comentarios' && (
        <ComentariosConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'pasoapaso' && (
        <PasoAPasoConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'preguntaslargas' && (
        <PreguntasLargas config={config} onChange={handleChange} />
      )}
      {block.type === 'roldelterapeuta' && (
        <RolDelTerapeutaConfigurator config={config} onChange={handleChange} />
      )}
      {block.type === 'materialRequest' && (
        <MaterialRequestConfigurator config={config} onChange={handleChange} />
      )}

      <button
        type="button"
        onClick={handleSave}
        className={styles.button}
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default BlockConfigurator;
