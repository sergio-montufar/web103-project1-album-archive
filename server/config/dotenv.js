import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve server/.env relative to this file, so it loads no matter which
// directory the script is run from.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });
