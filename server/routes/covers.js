const express = require("express");
const { getAlbumBySlug } = require("../data/albums");
const { coverSvg } = require("../data/cover");

// Generated SVG cover art. Mounted at /covers.
const router = express.Router();

router.get("/:slug.svg", (req, res) => {
  const album = getAlbumBySlug(req.params.slug);
  if (!album) {
    return res.status(404).send("Cover not found");
  }
  res.type("image/svg+xml").send(coverSvg(album));
});

module.exports = router;
