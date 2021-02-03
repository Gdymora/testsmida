require('dotenv').config()

const express = require("express");

const app = express();
const fs = require('fs');
const dataPath = './server/model/test_data.json';

app.get('/', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
       
        return res.send(JSON.parse(data));
    });
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

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);