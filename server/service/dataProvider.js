DataProvider = function () {
    const fs = require('fs');
    const util = require('util');
    const dataPath = './server/model/test_data.json';
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);

    this.getDataProvider = function () {
        return readFile(dataPath, 'utf8');
    }

    this.setDataProvider = function (array_data) {
        return writeFile(dataPath, array_data).then(function (error) {
            if (error) {
                return '{result: "error"}'; // выводим считанные данные
            } else {
                return '{result: "success", msg: "Asynchronous file writing completed."'; // выводим считанные данные
            }
        });
    }

};
module.exports.DataProvider = DataProvider;