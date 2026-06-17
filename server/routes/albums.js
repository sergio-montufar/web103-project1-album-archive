import express from "express";
import { albums, getAlbumBySlug } from "../data/albums.js";
import AlbumsController from '../controllers/albums.js';

// JSON API for album data. Mounted at /api/albums.
const router = express.Router();

// All albums (used by the home page grid).
router.get("/", AlbumsController.getAlbums);

// A single album by slug (used by the detail page).
router.get("/:slug", (req, res) => {
  const album = getAlbumBySlug(req.params.slug);
  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }
  res.json(album);
});

export default router;
