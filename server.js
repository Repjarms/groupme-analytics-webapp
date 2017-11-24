require('dotenv').config({ silent: true });
const server = require('./index');

const PORT = 3000;

server.listen(PORT, () => {
  console.log('example app listening on port %s', PORT);
});
