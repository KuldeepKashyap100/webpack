const path = require("path");
const fs = require("fs").promises;
const express = require('express');
const app = express();

app.get("/image", (req, res) => {
    const indexHtmlPath = path.resolve(process.cwd(), "dist/image.html");
    fs.readFile(indexHtmlPath, "utf-8")
        .then((data) => {
            res.send(data);
        });
});

app.get("/button", (req, res) => {
    const indexHtmlPath = path.resolve(process.cwd(), "dist/button.html");
    fs.readFile(indexHtmlPath, "utf-8")
        .then((data) => {
            res.send(data);
        });
});

app.use("/static", express.static(path.resolve(process.cwd(), "dist")));

app.listen(3000, () => {
    console.log("server started at port 3000  .........");
});