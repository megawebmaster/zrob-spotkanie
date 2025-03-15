const http = require('http');

const options = {
  host: 'localhost',
  port: process.env.PORT,
  path: '/',
  method: 'GET',
  timeout: 1000
};

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', function() {
  process.exit(1);
});

request.end();
