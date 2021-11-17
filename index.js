const https = require('https');

module.exports = function isJonSchlinkert(pkg) {
  let options = {
    host: 'registry.npmjs.org',
    path: '/' + pkg,
  }
  return new Promise((resolve, reject) => {
    let buf = '';
    https.get("https://registry.npmjs.org/" + pkg, (response) => {
      response.on('data', (chunk) => {
        buf += chunk;
      });

      response.on('end', () => {
        let json = JSON.parse(buf);
        let isJonSchlinkert = false;
        for (let maintainer of json.maintainers) {
          if (maintainer.name === 'jonschlinkert') {
            isJonSchlinkert = true;
            break;
          }
        }
        resolve(isJonSchlinkert);
      });
    });
  });
}
