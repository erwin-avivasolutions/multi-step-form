const jsonServer = require("json-server");
const fs = require("fs");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

function writeToFile(body) {
  const data = require("./db.json");
  console.log(data.form_submisisons);

  data.form_submisisons.push(body);

  fs.writeFile("db.json", JSON.stringify(data), (err) => {
    if (err) throw err;

    console.log("Succes");
  });
}

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  switch (req.path) {
    case "/form_submissions":
      writeToFile(req.body);
      return;
    default:
      next();
  }
});

server.listen(process.env.PORT, () => {
  console.log("json server running on port", process.env.PORT);
});
