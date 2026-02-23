const https = require('https');
const fs = require('fs');

const fontUrls = [
  { url: 'https://fonts.gstatic.com/s/syncopate/v25/pe0pMIuPIYBCpEV5eFdCBfe_.woff2', path: './public/fonts/Syncopate-Bold.woff2' },
  { url: 'https://fonts.gstatic.com/s/orbitron/v31/yHK30JzwTOU9q-O161o1F_I.woff2', path: './public/fonts/Orbitron.woff2' }
];

fontUrls.forEach(({ url, path }) => {
  https.get(url, (response) => {
    const file = fs.createWriteStream(path);
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Successfully downloaded ${path}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${path}:`, err.message);
  });
});
