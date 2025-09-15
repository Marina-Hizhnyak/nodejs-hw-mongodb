import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { Contact } from './models/contact.js';
import { getContactByIdController, getContactsController } from './controllers/contacts.js';

export function setupServer() {
  const app = express();

  // middleware
  app.use(cors());
  app.use(pino());

  app.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
  });


  app.get('/contacts', getContactsController);
  app.get('/contacts/:contactId', getContactByIdController);
  // 404
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });


  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
