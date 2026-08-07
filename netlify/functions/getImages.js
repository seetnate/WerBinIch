const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  try {
    // Navigiert zum Hauptordner und sucht den Ordner 'Bilder'
    const imagesDir = path.join(process.cwd(), 'Bilder');
    const files = fs.readdirSync(imagesDir);
    
    // Filtert nur Bilddateien heraus
    const images = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));
    
    return {
      statusCode: 200,
      body: JSON.stringify(images)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ordner nicht gefunden oder leer' })
    };
  }
};