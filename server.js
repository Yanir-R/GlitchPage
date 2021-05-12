const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) throw result.error;

const express = require('express');
const { getCollection } = require('./services/mongo.service');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html');
});

app.post('/api/form', async (req, res) => {
    try {
        console.log(req.params, req.body, req.query);
        const {
            time,
            donateAmount
        } = req.body;

        const collection = await getCollection('donations');

        const newDoc = await collection.insertOne({
            time: new Date(),
            donateAmount,
        });
        console.log(
            '🚀 ~ file: server.js ~ line 29 ~ app.post ~ newDoc',
            newDoc.ops[0]
        );

        res.send({
            response: 'thanks for your donation!!'
        });
    } catch (error) {
        console.log('🚀 ~ file: server.js ~ line 20 ~ app.post ~ error', error);
        res.send('oops');
    }
});

app.listen(3000, () => {
    console.log('started and listening on port 3000');
});