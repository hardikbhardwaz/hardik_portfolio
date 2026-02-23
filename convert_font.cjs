const https = require('https');
const fs = require('fs');

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
