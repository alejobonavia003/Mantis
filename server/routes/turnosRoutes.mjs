import express from 'express';
const router = express.Router();
import nodemailer from 'nodemailer';


// Configura el transporter para enviar correos
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mantisespacio@gmail.com",
    pass: "uamm ldbq pplh prwb",
  },
});

// POST /api/turnos
// Envia un correo con los datos del turno
router.post('/', async (req, res) => {
  try {
    const { nombre, apellidos, email, edad, residencia, disponibilidad, tipoSesion, frecuencia, conocio, dudas, telefono, horario, motivo } = req.body;

    // Lista de correos a los que se enviará el mensaje
    //const recipients = ["macasanti23@gmail.com", "licflorenciavisconti@gmail.com "];
    const recipients = ["bonaviaalejo@gmail.com", "alejobonavia003i@gmail.com "];

    // Crear el contenido HTML del correo
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Nuevo turno solicitado</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
        <p><strong>Edad:</strong> ${edad}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Lugar de residencia:</strong> ${residencia}</p>
        <p><strong>Disponibilidad horaria:</strong> ${disponibilidad}</p>
        <p><strong>Motivo de consulta:</strong> ${motivo}</p>
        <p><strong>Prefiere a:</strong> ${tipoSesion}</p>
        <p><strong>Frecuencia de sesiones:</strong> ${frecuencia}</p>
        <p><strong>¿Dónde nos conoció?</strong> ${conocio}</p>
        <p><strong>Dudas o comentarios adicionales:</strong> ${dudas}</p>
      </div>
    `;

    // Enviar correo a cada destinatario
    for (const recipient of recipients) {
      await transporter.sendMail({
        from: "mantisespacio@gmail.com",
        to: recipient,
        subject: "Nuevo turno solicitado",
        html: htmlContent, // Usar HTML en lugar de texto plano
      });
    }

    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
});

// POST /api/materiales
// Envia un correo con los datos del material solicitado
router.post('/materiales', async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, material, conocio } = req.body;

    const recipients = ["bonaviaalejo@gmail.com", "alejobonavia003i@gmail.com "];

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Nuevo pedido de material</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Material solicitado:</strong> ${material}</p>
        <p><strong>¿Dónde nos conoció?:</strong> ${conocio}</p>
      </div>
    `;

    for (const recipient of recipients) {
      await transporter.sendMail({
        from: "mantisespacio@gmail.com",
        to: recipient,
        subject: "Nuevo pedido de material",
        html: htmlContent,
      });
    }

    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
});

export default router;