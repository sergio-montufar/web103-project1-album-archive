const express = require("express");
const { albums, getAlbumBySlug } = require("../data/albums");

// JSON API for album data. Mounted at /api/albums.
const router = express.Router();

// All albums (used by the home page grid).
router.get("/", (req, res) => {
  res.json(albums);
});

// A single album by slug (used by the detail page).
router.get("/:slug", (req, res) => {
  const album = getAlbumBySlug(req.params.slug);
  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }
  res.json(album);
});

module.exports = router;
