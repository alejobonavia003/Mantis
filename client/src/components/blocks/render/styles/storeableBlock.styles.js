// storeableBlock.styles.js

const styles = {
  blockItem: {
    border: '2px dashed #ccc',
    backgroundColor: '#f9f9f9',
    margin: '10px 0',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  selected: {
    backgroundColor: '#e6f7ff',
  },
  blockHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff4d4f', // Botón de administración llamativo
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  deleteButtonHover: {
    backgroundColor: '#d9363e',
    transform: 'scale(1.05)',
  },
  blockPreview: {
    padding: '10px',
  },
};

export default styles;
