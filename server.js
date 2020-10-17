const checkFile = () => {
  const fs = require("fs");
  if (!fs.existsSync("./dist/index.html")) {
    console.log("Please run `npm run build`");
    process.exit(0);
  }
};

(function () {
  checkFile();

  const express = require("express");
  const app = express();
  app.use(express.static("dist"));
  app.use(express.static("public"));

  const port = 3000;
  console.log(`Listening on port ${port}`);
  app.listen(port);
})();
