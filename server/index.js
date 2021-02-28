require('dotenv').config()

const express = require("express");
const multer = require("multer");
const app = express();

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// определение фильтра
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
app.use(express.static(__dirname));

app.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("picture"));
app.post("/upload", function (req, res, next) {
    let filedata = req.file;
    if (!filedata) {
        console.log("errror");
        res.send({ result: "error" });
    }
    else {
        console.log("success");
        res.send({ result: "success", msg: "Asynchronous file writing completed." });
    }
});
//require('./service/dataManager')(app);

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);