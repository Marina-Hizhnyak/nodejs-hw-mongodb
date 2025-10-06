import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import contactsRoutes from "./routes/contacts.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import { auth } from './middlewares/authenticate.js';

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(pino());

  app.use("/contacts", auth, contactsRoutes);
  app.use("/auth", authRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);


  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
