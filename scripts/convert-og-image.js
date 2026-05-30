const sharp = require('sharp');
const fs = require('fs');

const svgPath = './app/opengraph-image.svg';
const pngPath = './app/opengraph-image.png';

// Read the SVG file
const svgBuffer = fs.readFileSync(svgPath);

// Convert SVG to PNG
sharp(svgBuffer)
  .resize(1200, 630)
  .png()
  .toFile(pngPath)
  .then(() => {
    console.log('Open graph image converted to PNG successfully');
  })
  .catch(err => {
    console.error('Error converting SVG to PNG:', err);
  });
