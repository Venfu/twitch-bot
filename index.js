"use strict";

require("./backend/dist/app.js");
const express = require("express");
const app = express();
const port = 80;
const app_folder = "./frontend/";
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['html', 'js', 'scss', 'css'],
  index: false,
  maxAge: '1y',
  redirect: true,
}


app.use(express.static(app_folder, options));

app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: app_folder});
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
