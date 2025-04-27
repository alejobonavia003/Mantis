import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import BlockPreview from '../components/blocks/BlockPreview';

const GenericPage = ({ pageName }) => {
  const [blocks, setBlocks] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/blocks?page=${pageName}`);
        setBlocks(response.data.sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error('Error loading blocks:', err);
      }
    };
    loadBlocks();
  }, [pageName]); // Añadir pageName como dependencia

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="frontendContainer">
      {blocks.map((block) => (
        <section key={block.id} className="frontendBlock">
          <BlockPreview block={block} />
        </section>
      ))}
    </div>
  );
};

export default GenericPage;