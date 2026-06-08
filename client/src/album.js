import "./style.css";
import { covers } from "./covers.js";

// Detail page: read the slug from the URL (/albums/:slug), fetch that album,
// and fill in the placeholder elements that already exist in album.html.
const renderAlbum = async () => {
  const slug = window.location.pathname.split("/").pop();

  const response = await fetch(`/api/albums/${slug}`);

  if (!response.ok) {
    window.location.href = "/404.html";
    return;
  }

  const album = await response.json();

  document.title = `${album.title} · Album Archive`;

  const cover = document.getElementById("cover");
  cover.src = covers[album.slug];
  cover.alt = `${album.title} cover art`;

  document.getElementById("title").textContent = album.title;
  document.getElementById("artist").textContent = album.artist;
  document.getElementById("genre").textContent = album.genre;
  document.getElementById("year").textContent = album.year;

  const trackList = document.getElementById("track-list");
  album.tracks.forEach((track, index) => {
    const item = document.createElement("li");

    const number = document.createElement("span");
    number.classList.add("track-num");
    number.textContent = `${index + 1}.`;
    item.appendChild(number);

    const name = document.createElement("span");
    name.textContent = track;
    item.appendChild(name);

    trackList.appendChild(item);
  });

  document.getElementById("album-detail").removeAttribute("aria-busy");
};

renderAlbum();
