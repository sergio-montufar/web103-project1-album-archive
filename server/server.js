import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import "./config/dotenv.js";
import albumsRouter from "./routes/albums.js";
import pagesRouter from "./routes/pages.js";

// __dirname isn't defined in ES modules, so recreate it from import.meta.url.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

// The frontend is a Vite app; we serve its production build (client/dist).
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");

// JSON API.
app.use("/api/albums", albumsRouter);

// Static frontend (CSS/JS bundles, index.html at "/").
app.use(express.static(CLIENT_DIST));

// Per-album pages (e.g. /albums/thriller).
app.use("/albums", pagesRouter(CLIENT_DIST));

// Anything that didn't match above gets the styled 404 page.
app.use((req, res) => {
  res.status(404).sendFile(path.join(CLIENT_DIST, "404.html"));
});

app.listen(PORT, () => {
  console.log(`Album Archive server running at http://localhost:${PORT}`);
});
