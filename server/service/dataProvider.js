DataProvider = function () {
    const fs = require('fs');
    const util = require('util');
    const dataPath = './server/model/test_data.json';
    const readFile = util.promisify(fs.readFile);

    this.getDataProvider = function () {
        return readFile(dataPath, 'utf8');
    }
};
module.exports.DataProvider = DataProvider;