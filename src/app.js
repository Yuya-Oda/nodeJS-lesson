const express = require('express'); //import文と同義
const bodyParser = require('body-parser');
const app = express();

const server = app.listen(4000, () =>{
    console.log('Node.js listen to PORT:' + server.address().port);
});

app.disable('x-powered-by'); //表示しない指定
app.use(bodyParser.json());



const sampleDeta = [
    {
        id: 0,
        title: 'Sample Deta 1',
        description: 'Sample Deta 1'
    },
    {
        id: 1,
        title: 'Sample Deta 2',
        description: 'Sample Deta 2'
    }
];

app.get('/', (req, res, next) => {
    res.json(sampleDeta);
});

app.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const deta = sampleDeta.find((deta) => deta.id === id);
    res.json(deta);
});

app.post('/', (req, res, next) => {
    const deta = req.body;
    console.log(deta);
    res.json(deta);
});






