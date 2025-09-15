import 'dotenv/config';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

// async function bootstrap() {
//   try {
//     await initMongoConnection();
//     setupServer();
//   } catch (error) {
//     console.error('Application failed to start:', error.message);
//   }
// }

// bootstrap();
(async () => {
  await initMongoConnection();
  setupServer();
})();