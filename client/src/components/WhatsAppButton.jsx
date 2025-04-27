import { useState } from "react";
//import styles from "../styles/WhatsAppButton.module.css";
import logo from "../assets/Whatsapp_icon-icons.com_66931.svg";

const WhatsAppButton = () => {
  // Números de teléfono disponibles
  const phoneNumbers = [
    { id: 1, number: "543512104223", name: "Macarena Santi" },
    { id: 2, number: "543512506026", name: "María Florencia Visconti Bogosevich" }
  ];

  // Estado para controlar la visibilidad del modal, el número seleccionado y el mensaje
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(phoneNumbers[0].number);
  const [message, setMessage] = useState("Hola, quiero más información.");

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);
  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  // Función para enviar el mensaje: se redirige a la url de WhatsApp con el número y mensaje elegido
  const handleSend = () => {
    const whatsappUrl = `https://wa.me/${selectedNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    closeModal();
  };

  return (
    <>
      {/* Botón fijo que abre el modal */}
      <a
        href="#!"
        onClick={openModal}
        className="whatsappButton"
      >
        <img
          src={logo}
          alt="WhatsApp"
          className="whatsappIcon"
        />
      </a>

      {/* Modal */}
      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Enviar Mensaje</h3>
            {/* Selector de número de WhatsApp */}
            <div className="field">
              <label htmlFor="phone">Selecciona a una de nuestras psicólogas:</label>
              <select
                id="phone"
                value={selectedNumber}
                onChange={(e) => setSelectedNumber(e.target.value)}
              >
                {phoneNumbers.map((phone) => (
                  <option key={phone.id} value={phone.number}>
                    {phone.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo para editar el mensaje */}
            <div className="field">
              <label htmlFor="message">Mensaje:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
              />
            </div>

            {/* Botones */}
            <div className="buttonGroup">
              <button onClick={handleSend} className="sendButton">
                Enviar
              </button>
              <button onClick={closeModal} className="cancelButton">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
