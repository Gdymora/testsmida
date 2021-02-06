module.exports = function (app) {

    const DataProvider = require('./dataProvider').DataProvider;
    const dataProvider = new DataProvider();
    
    //  adjustment to the CORS 
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
        next();  //pass request processing to the app.post method ("/" ...
    });

    app.get('/', async (req, res) => {
        let data = await dataProvider.getDataProvider();
        res.send(data);
    });

    app.post('/', (req, res) => {
        return res.send('Received a POST HTTP method');
    });

    app.put('/', (req, res) => {
        return res.send('Received a PUT HTTP method');
    });

    app.get('/delete/:id', async (req, res) => {
        const id = req.params.id;
        let data = await dataProvider.getDataProvider();
        if (data.length == 0) {
            return res.send('{result:"error", msg: "The request could not be completed because the file is empty"}');
        } else {
            let data_array_id = JSON.parse(data).filter(data => data.idReport != id);
            let data_new = await dataProvider.setDataProvider(JSON.stringify(data_array_id));
            console.log(data_new);
            res.send(data_new);
        }
    });
}; 