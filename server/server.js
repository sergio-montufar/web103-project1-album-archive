const path = require("path");
const express = require("express");

const albumsRouter = require("./routes/albums");
const coversRouter = require("./routes/covers");
const pagesRouter = require("./routes/pages");

const app = express();
const PORT = process.env.PORT || 3000;

// The frontend is a Vite app; we serve its production build (client/dist).
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");

// API + generated cover art.
app.use("/api/albums", albumsRouter);
app.use("/covers", coversRouter);

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
