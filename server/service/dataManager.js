module.exports = function (app, upload) {

    const DataProvider = require('./dataProvider').DataProvider;
    const dataProvider = new DataProvider();

    //  adjustment to the CORS 
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
        next();  //pass request processing to the app.post method ("/" ...
    });

    


    app.post("/upload", function (req, res) {
        console.log("ret");

    });
}; 