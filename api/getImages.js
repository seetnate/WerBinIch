const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  try {
    const dir = path.join(process.cwd(), 'Bilder');
    const files = fs.readdirSync(dir);
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: 'Bilder konnten nicht geladen werden' });
  }
}