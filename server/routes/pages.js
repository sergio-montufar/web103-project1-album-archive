import path from "path";
import express from "express";
import { getAlbumBySlug } from "../data/albums.js";

// Serves the HTML page for an individual album. Mounted at /albums.
// The detail view reads the slug from the URL and fetches /api/albums/:slug,
// so we only serve the page for albums that actually exist (otherwise we fall
// through to the 404 handler).
export default function pages(clientDist) {
  const router = express.Router();

  router.get("/:slug", (req, res, next) => {
    if (!getAlbumBySlug(req.params.slug)) return next();
    res.sendFile(path.join(clientDist, "album.html"));
  });

  return router;
}
