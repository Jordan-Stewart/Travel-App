//require other server js files
const app = require("./index");

// Initalize Server
const server = app.listen(8080, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server is running on http://${host}:${port}`);
}
