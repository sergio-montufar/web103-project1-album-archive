import "./style.css";
import { covers } from "./covers.js";

// Home page: fetch all albums from the backend and build a card for each.
const renderAlbums = async () => {
  const grid = document.getElementById("album-grid");

  const response = await fetch("/api/albums");
  const albums = await response.json();

  grid.removeAttribute("aria-busy");
  grid.textContent = "";

  if (albums && albums.length) {
    albums.forEach((album) => {
      const link = document.createElement("a");
      link.classList.add("album-card");
      link.href = `/albums/${album.slug}`;

      const article = document.createElement("article");

      const cover = document.createElement("img");
      cover.src = covers[album.slug];
      cover.alt = `${album.title} cover art`;
      article.appendChild(cover);

      const title = document.createElement("h3");
      title.textContent = album.title;
      article.appendChild(title);

      const artist = document.createElement("p");
      artist.classList.add("artist");
      artist.textContent = album.artist;
      article.appendChild(artist);

      const meta = document.createElement("p");
      meta.classList.add("album-meta");
      meta.textContent = `${album.year} · ${album.genre}`;
      article.appendChild(meta);

      link.appendChild(article);
      grid.appendChild(link);
    });
  } else {
    const message = document.createElement("h2");
    message.textContent = "No albums available 😞";
    grid.appendChild(message);
  }
};

renderAlbums();
