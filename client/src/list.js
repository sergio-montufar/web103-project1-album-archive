import "./style.css";
import { covers } from "./covers.js";

const grid = document.getElementById("album-grid");
const searchInput = document.getElementById("album-search");

// Build a single album card.
const buildCard = (album) => {
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
  return link;
};

const renderAlbums = (albums) => {
  grid.removeAttribute("aria-busy");
  grid.textContent = "";

  if (albums && albums.length) {
    albums.forEach((album) => grid.appendChild(buildCard(album)));
  } else {
    const message = document.createElement("h2");
    message.textContent = "No albums found 😞";
    grid.appendChild(message);
  }
};

// Fetch albums, optionally filtered by a search term, and render them.
const loadAlbums = async (search = "") => {
  const query = search.trim() ? `?search=${encodeURIComponent(search.trim())}` : "";
  const response = await fetch(`/api/albums${query}`);
  const albums = await response.json();
  renderAlbums(albums);
};

// Debounce the search so we don't hit the API on every keystroke.
let debounceTimer;
searchInput.addEventListener("input", (event) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => loadAlbums(event.target.value), 250);
});

loadAlbums();
