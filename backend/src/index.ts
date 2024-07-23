import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import businessRoutes from './routes/businessRoutes';
import bookingRoutes from './routes/bookingRoutes';
import { connectToDb, PORT } from './db';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/businesses', businessRoutes);
app.use('/bookings', bookingRoutes);

app.post('/email', async (req, res) => {
  const { to, subject, text, html } = req.body;

  const msg = {
    to,
    from: 'a.kliosovas@yahoo.com',
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email');
  }
});

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });
