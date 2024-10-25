import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, type Request, type Response } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

console.log(__dirname);
// logging _dirname so that ts allows me to run this
// TODO: Define route to serve index.html
router.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../../client/index.html'));
});

export default router;
