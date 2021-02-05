module.exports = function (app) {

    const DataProvider = require('./dataProvider').DataProvider;
    const dataProvider = new DataProvider();

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

    app.delete('/', (req, res) => {
        return res.send('Received a DELETE HTTP method');
    });
}; 