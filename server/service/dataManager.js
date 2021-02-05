module.exports = function (app) {

    const DataProvider = require('./dataProvider').DataProvider;
    const dataProvider = new DataProvider();

    app.get('/', async (req, res) => {
        let data = await dataProvider.getDataProvider();
        console.log(data);
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
        let data = await dataProvider.setDataProvider();
        let data_array_id = JSON.parse(data).filter(data => data.idReport == id);
        res.send(data_array_id);
    });
}; 