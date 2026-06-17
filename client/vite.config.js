import { resolve } from "path";
import { defineConfig } from "vite";

// In dev, the browser navigates to clean URLs like /albums/thriller. Vite only
// knows album.html as a file, so rewrite any /albums/* request to album.html.
// (In production the Express backend handles this routing.) The browser URL is
// left unchanged, so album.js can still read the slug from the path.
function albumRoutes() {
  return {
    name: "album-routes",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url.startsWith("/albums/")) {
          req.url = "/album.html";
        }
        next();
      });
    },
  };
}

// Multi-page Vite build: each view is its own HTML entry point. The Express
// backend serves the built output from ../server in production, and proxies
// the API to it during `vite dev`.
export default defineConfig({
  plugins: [albumRoutes()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        album: resolve(__dirname, "album.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
