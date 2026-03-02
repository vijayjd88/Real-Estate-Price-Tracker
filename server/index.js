const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const AREAS_FILE = path.join(DATA_DIR, 'areas.json');

function loadAreas() {
  try {
    const raw = fs.readFileSync(AREAS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

app.get('/api/areas', (req, res) => {
  const city = (req.query.city || '').toLowerCase();
  let areas = loadAreas();
  if (city === 'chennai' || city === 'bangalore') {
    areas = areas.filter(a => a.city.toLowerCase() === city);
  }
  res.setHeader('Cache-Control', 'no-store');
  res.json(areas);
});

app.use(express.static(ROOT));

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
}

module.exports = app;
