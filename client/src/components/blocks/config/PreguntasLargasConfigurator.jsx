import { useState } from 'react';
import styles from '../render/styles/configuratorBlock.module.css';
import RichTextEditor from '../../dnd/RichTextEditor';

const PreguntasLargas = ({ config, onChange }) => {

    const handleChange = (field, value) => {
        onChange(field, value);
    };




    return (
        <>
            <label className={styles.label}>
                primera pregunta:
                <RichTextEditor
                    value={config.pregunta1 || ''}
                    onChange={(content) => handleChange('pregunta1', content)}
                />
            </label>

            <label className={styles.label}>
                recuadro:
                <RichTextEditor
                    value={config.recuadro || ''}
                    onChange={(content) => {
                        handleChange('recuadro', content);
                    }}
                />
            </label>
            <label className={styles.label}>
                parrafo 1 a la derecha del recuadro:
                <RichTextEditor
                    value={config.parrafo1 || ''}
                    onChange={(content) => {
                        handleChange('parrafo1', content);
                    }}
                />
            </label>

            <label className={styles.label}>
                parrafo 2 a la derecha del recuadro:
                <RichTextEditor
                    value={config.parrafo2 || ''}
                    onChange={(content) => {
                        handleChange('parrafo2', content);
                    }}
                />
            </label>

            <label className={styles.label}>
                segunda pregunta:
                <RichTextEditor
                    value={config.pregunta2 || ''}
                    onChange={(content) => handleChange('pregunta2', content)}
                />
            </label>

            <label className={styles.label}>
                parrafo 1 de la segunda pregunta:
                <RichTextEditor
                    value={config.parrafo3 || ''}
                    onChange={(content) => {
                        handleChange('parrafo3', content);
                    }}
                />
            </label>

            <label className={styles.label}>
                parrafo 2 de la segunda pregunta:
                <RichTextEditor
                    value={config.parrafo4 || ''}
                    onChange={(content) => {
                        handleChange('parrafo4', content);
                    }}
                />
            </label>


            <label className={styles.label}>
                parrafo 3 de la segunda pregunta:
                <RichTextEditor
                    value={config.parrafo5 || ''}
                    onChange={(content) => {
                        handleChange('parrafo5', content);
                    }}
                />
            </label>


            <label className={styles.label}>
                Texto del botón 1:
                <input
                    type="text"
                    value={config.buttonText || ''}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                    className={styles.input}
                />
            </label>

            <label className={styles.label}>
                URL del botón 1:
                <input
                    type="url"
                    value={config.buttonUrl || ''}
                    onChange={(e) => handleChange('buttonUrl', e.target.value)}
                    className={styles.input}
                />
            </label>

            <label className={styles.label}>
                Color del botón 1:
                <input
                    type="color"
                    value={config.buttonColor || '#516f61'}
                    onChange={(e) => handleChange('buttonColor', e.target.value)}
                    className={styles.colorInput}
                />
            </label>

            
            <label className={styles.label}>
                Texto del botón 2:
                <input
                    type="text"
                    value={config.buttonText2 || ''}
                    onChange={(e) => handleChange('buttonText2', e.target.value)}
                    className={styles.input}
                />
            </label>

            <label className={styles.label}>
                URL del botón 2:
                <input
                    type="url"
                    value={config.buttonUrl2 || ''}
                    onChange={(e) => handleChange('buttonUrl2', e.target.value)}
                    className={styles.input}
                />
            </label>

            <label className={styles.label}>
                Color del botón 2:
                <input
                    type="color"
                    value={config.buttonColor2 || '#516f61'}
                    onChange={(e) => handleChange('buttonColor2', e.target.value)}
                    className={styles.colorInput}
                />
            </label>

            
            <label className={styles.label}>
                Texto del botón 3:
                <input
                    type="text"
                    value={config.buttonText3 || ''}
                    onChange={(e) => handleChange('buttonText3', e.target.value)}
                    className={styles.input}
                />
            </label>

            <label className={styles.label}>
                URL del botón 3:
                <input
                    type="url"
                    value={config.buttonUrl3 || ''}
                    onChange={(e) => handleChange('buttonUrl3', e.target.value)}
                    className={styles.input}
                />
            </label>

            <label className={styles.label}>
                Color del botón 3:
                <input
                    type="color"
                    value={config.buttonColor3 || '#516f61'}
                    onChange={(e) => handleChange('buttonColor3', e.target.value)}
                    className={styles.colorInput}
                />
            </label>



        </>

    );
};

export default PreguntasLargas;
