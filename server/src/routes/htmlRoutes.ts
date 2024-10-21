import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

console.log(__dirname);
// logging _dirname so that ts allows me to run this
// TODO: Define route to serve index.html

export default router;
