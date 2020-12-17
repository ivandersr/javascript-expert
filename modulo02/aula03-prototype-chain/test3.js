const https = require('https');
// https.get('https://nodejs.org/dist/index.json', async (res) => {
//   for await (const chunk of res) {
//     console.log(chunk.toString());
//   }
// });

(async () => {
  const response = await new Promise(r => https.get('https://nodejs.org/dist/index.json', r));
  for await (const chunk of response) {
    console.log(chunk.toString());
  }
})();