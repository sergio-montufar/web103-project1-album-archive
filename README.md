# WEB103 Projects 1 & 2 - *Album Archive*

Submitted by: **Sergio Montufar**

About this web app: **An album archive that lists albums I enjoy. The home page shows each album as a card with its cover art, artist, year, and genre. Clicking a card opens a detail page with the cover, artist, year, genre, and full track list. Built with a Vite frontend (plain HTML/CSS/JS, no framework) and an Express backend that serves the pages, a JSON API, and generated SVG cover art.**

Time spent: **5** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**

The following **optional** features are implemented:

- [x] The user can search for items by a specific attribute
  - The home page has a search box that filters albums by title, artist, or genre. The query is sent to the backend (`/api/albums?search=...`), which runs a case-insensitive `ILIKE` query against the Postgres `albums` table, so the filtering happens in the database rather than on the client.

The following **additional** features are implemented:

- [x] The frontend (Vite) and backend (Express) are cleanly separated; the backend exposes a JSON API (`/api/albums`, `/api/albums/:slug`)

## How to run

1. Build the frontend: `cd client && npm install && npm run build`
2. Start the backend: `cd server && npm install && npm start`
3. Open `http://localhost:3000`

For frontend development with hot reload, run `npm run dev` in `client` (proxies the API to the backend) alongside `npm run dev` in `server`.

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='walkthrough.gif' title='Video Walkthrough' width='600' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with Kap
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

A few things made this project more involved than I first expected:

- **Splitting the frontend and backend, but serving on one port.** The app is a Vite frontend (plain HTML/CSS/JS) and a separate Express backend. In development I run them on two ports (`5173` for Vite, `3001` for the API) and use Vite's dev proxy to forward `/api` calls to the backend. For the graded single-server setup, the Express backend serves the built `client/dist` as static files *and* exposes the JSON API, so everything lives on one URL. Understanding which server was responsible for what (static files vs. data vs. routing) was the biggest conceptual hurdle.

- **Clean detail-page URLs like `/albums/thriller`.** Because the detail pages use a single `album.html` template that reads the slug from the URL, I had to make both servers understand those routes: the Express backend serves `album.html` for `/albums/:slug`, and in dev I added a small Vite middleware to rewrite `/albums/*` requests to `album.html`. The frontend JS then pulls the slug from the path and fetches that album from `/api/albums/:slug`.

- **Getting the track lists right.** A couple of albums (especially the newer and deeper releases) had track lists I initially got wrong, so I verified them against authoritative sources rather than trusting memory.

- **Cover art.** I first generated placeholder SVG cover art on the server from gradient colors, then replaced it with the real album covers. The images live in `client/src/cover_arts/` and are imported through a slug→image map so Vite bundles and fingerprints them, which removed the need for the old server-side cover route entirely.

- **Search.** I added search as the optional feature. The deciding question was *where* to filter — in the browser over the already-loaded list, or in the database. I went with the database (`ILIKE` over title/artist/genre) so the search reflects whatever is actually stored, and debounced the input on the frontend so each keystroke doesn't fire a separate request.

## License

Copyright [2026] [Sergio Montufar]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.