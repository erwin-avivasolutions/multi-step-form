const jsonServer = require("json-server");
const fs = require("fs");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

function writeToFile(body) {
  var data = require("./db.json");

  data.form_submisisons.push(body);

  fs.writeFile("db.json", JSON.stringify(data), (err) => {
    if (err) return 500;

    console.log("Succes");
    return 200;
  });
}

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  switch (req.path) {
    case "/form_submissions":
      const status = writeToFile(req.body);
      console.log(status);
      res.status(200).json("succes");
      return;
    default:
      next();
  }
});

server.listen(process.env.PORT, () => {
  console.log("json server running on port", process.env.PORT);
});
