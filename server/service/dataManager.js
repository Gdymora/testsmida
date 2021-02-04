 module.exports = function (app) {
    var DataProvider = require ('./dataProvider').DataProvider;
    var dataProvider = new DataProvider();


    app.get('/', (req, res) => {
        console.log("date",dataProvider.getDataProvider());
     res.send(dataProvider.getDataProvider());
    });
    app.get('/data', (req, res) => {
        return res.send('Received a GET HTTP methodw');
       
    });

    app.post('/', (req, res) => {
        return res.send('Received a POST HTTP method');
    });

    app.put('/', (req, res) => {
        return res.send('Received a PUT HTTP method');
    });

    app.delete('/', (req, res) => {
        return res.send('Received a DELETE HTTP method');
    });
}; 