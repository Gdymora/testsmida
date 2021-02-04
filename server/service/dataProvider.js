DataProvider = function () {
    const fs = require('fs');
    const dataPath = './server/model/test_data.json';

    this.getDataProvider = function () {

    var data_json =  fs.readFileSync(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            return data;
        });    
        return data_json
    }
};
module.exports.DataProvider = DataProvider;