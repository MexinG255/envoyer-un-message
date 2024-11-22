const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).send({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    // Configurer le transporteur (par exemple avec Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mexingervais@gmail.com', // Remplacez par votre email
        pass: 'gervaislopi',   // Remplacez par votre mot de passe
      },
    });

    // Paramètres de l'email
    const mailOptions = {
        from: 'votre-email@gmail.com',  // Remplacez par votre email
        to,
        subject,
        text: message,
      };
  
      // Envoyer l'email
      await transporter.sendMail(mailOptions);
  
      res.status(200).send({ success: 'Email envoyé avec succès !' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
  });
  
  // Lancer le serveur
  app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
  });
  