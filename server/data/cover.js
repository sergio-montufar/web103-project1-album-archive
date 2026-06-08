// Generates a self-contained SVG "cover art" for an album so the app needs
// no external image assets. Uses the album's two cover colors as a gradient
// and overlays the title and artist.

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Naive word-wrap so long titles fit on the square cover.
function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

function coverSvg(album) {
  const [c1, c2] = album.cover;
  const id = album.slug;
  const titleLines = wrapText(album.title, 16);
  const startY = 200 - (titleLines.length - 1) * 22;

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="50%" y="${startY + i * 44}">${escapeXml(line)}</tspan>`
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" role="img" aria-label="${escapeXml(
    album.title
  )} cover art">
  <defs>
    <linearGradient id="grad-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#grad-${id})"/>
  <rect x="20" y="20" width="360" height="360" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
  <text font-family="Georgia, 'Times New Roman', serif" font-size="38" font-weight="700" fill="#ffffff" text-anchor="middle">${titleTspans}</text>
  <text x="50%" y="320" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.85)" text-anchor="middle">${escapeXml(
    album.artist
  )}</text>
</svg>`;
}

module.exports = { coverSvg };
