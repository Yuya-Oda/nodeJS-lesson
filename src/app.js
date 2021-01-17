const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

//#region expressでWebサーバーの設定

// expressで4000ポートにサーバー起動
const server = app.listen(4000, () => {
  console.log('Node.js is listening to PORT:' + server.address().port);
});

// expressの設定(corsの許可)
app.disable('x-powered-by');
app.use(cors()).use(bodyParser.json());

// // cors を使用せず手動で設定すると以下のような感じになる
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, access_token'
//   );
//   if ('OPTIONS' === req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });

//#endregion

//#region mysqlに接続

// mysqlに接続
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'user',
  password: 'password',
  database: 'sample_database'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected mysql');
});

//#endregion

//#region APIのエンドポイント(APIに接続するためのURL)を設定

app.get('/', (req, res, next) => {
  const sql = 'select * from todos';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const sql = 'select * from todos where ?';
  connection.query(sql, {id: id},(err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// app.post('/', (req, res, next) => {
//   const data = req.body;
//   console.log(data);
//   res.json(data);
// });


//#endregion
