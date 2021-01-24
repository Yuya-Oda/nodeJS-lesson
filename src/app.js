const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const TodoRepository = require('./repository/TodoRepository');
const Todo = require('./model/Todo')
const TodoService = require('./service/TodoService')
const TodoController = require('./controller/TodoController')

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
  database: 'sample_detabase'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected mysql');
});

//#endregion

//#region APIのエンドポイント(APIに接続するためのURL)を設定

// http://localhost:4000以降のURLを作成

const todoRepository = new TodoRepository(connection);
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);
app.use('/api/', todoController.router);





// todoControllerへ移植
// const todoUrl = '/api/todos'; 

// app.get(todoUrl, async (req, res, next) => {
//   const todos = await todoService.getAll();
//   res.status(200).json(todos);
// });

// app.get(todoUrl + '/:id', async (req, res, next) => {
//   const id = parseInt(req.params.id);
//   const todo = await todoService.get(id);
//   res.status(200).json(todo);
// });

// app.post(todoUrl, async (req, res, next) => {
//   const todo = new Todo(0, req.body.title, req.body.description);
//   const insertId = await todoService.create(todo);
//   res.status(201).json(insertId);
// });

// app.put(todoUrl + "/:id", async (req, res, next) => {
//   const id = parseInt(req.params.id);
//   const data = req.body;
//   const todo = new Todo(id, data.title, data.description);
//   const result = await todoService.update(todo);
//   res.status(200).json(result);
// });

// app.delete(todoUrl + "/:id", async (req, res, next) => {
//   const id = parseInt(req.params.id);
//   const result = await todoService.delete(id);
//   res.status(204).json(result);
// });




// app.get(todoUrl + '/', (req, res, next) => {
//   const sql = 'select * from todos';
//   connection.query(sql, (err, results) => {
//     if (err) throw err;
//     res.status(200).json(results); // 成功時に返すステータスコードを指定
//   });
// });

// app.get(todoUrl +'/:id', (req, res, next) => {
//   const id = parseInt(req.params.id);
//   const sql = 'select * from todos where ?';
//   connection.query(sql, {id: id},(err, results) => {
//     if (err) throw err;
//     res.status(200).json(results[0]);
//   });
// });

// //INSERT文
// app.post(todoUrl +'/', (req, res, next) => {
//   const data = req.body;
//   const sql = 'insert into todos set ?';
//   connection.query(sql, data, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.status(201).json(result.insertId); 
//     // 201:CREATED　追加時や新規作成時によく使う
//   });
// });

// // UPDATE文
// app.put(todoUrl +'/:id', (req, res, next) => {
//   const id = parseInt(req.params.id);
//   const data = req.body; // 更新したい情報を取得
//   const sql = 'update todos set ? where ?';
//   connection.query(sql, [data, {id: id}], (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.status(200).json(results);
//   });
// });

// // DELETE文
// app.delete(todoUrl +'/:id', (req, res, next) => {
//   const id = parseInt(req.params.id);
//   const sql = 'delete from todos where ?';
//   connection.query(sql, {id: id}, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.status(204).json(results);
//     // 204:No Content　中身がないという意味で削除時に使うことがある
//   });
// });


//#endregion
