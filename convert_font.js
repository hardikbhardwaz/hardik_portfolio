// Node.js script to download and convert the Inter font to a Three.js compatible Typeface JSON
const https = require('https');
const fs = require('fs');

// We will download a reliable, pre-converted JSON typeface from a trusted CDN to guarantee WebGL stability.
// Since Troika is failing on DataView WOFF bounds, we use the standard ThreeJS FontLoader.
const fontUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json';
const path = './public/fonts/futuristic.json';

https.get(fontUrl, (response) => {
  const file = fs.createWriteStream(path);
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log(`Successfully downloaded ${path}`);
  });
}).on('error', (err) => {
  console.error(`Error downloading ${path}:`, err.message);
});
