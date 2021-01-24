const { Router } = require('express'); // ルーティングの設定
const Todo = require('../model/Todo')

const TodoController = function(todoService){
    this.todoService = todoService;
    this.router = Router();

    this.router.get('/todos', async (req, res, next) => {
        const todos = await todoService.getAll();
        res.status(200).json(todos);
    });

    this.router.get('/todos/:id', async (req, res, next) => {
        const id = parseInt(req.params.id);
        const todo = await todoService.get(id);
        res.status(200).json(todo);
    });

    this.router.post('/todos', async (req, res, next) => {
        const todo = new Todo(0, req.body.title, req.body.description);
        const insertId = await todoService.create(todo);
        res.status(201).json(insertId);
    });

    this.router.put('/todos/:id', async (req, res, next) => {
        const id = parseInt(req.params.id);
        const data = req.body;
        const todo = new Todo(id, data.title, data.description);
        const result = await todoService.update(todo);
        res.status(200).json(result);
    });

    this.router.delete('/todos/:id', async (req, res, next) => {
        const id = parseInt(req.params.id);
        const result = await todoService.delete(id);
        res.status(204).json(result);
    });

};

module.exports = TodoController;

