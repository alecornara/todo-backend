const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;

// API Key personalizada
const API_KEY = 'mi_api_key_123';

mongoose.connect('mongodb://127.0.0.1:27017/todolist')
.then(() => {
    console.log('Conectado a MongoDB');
})
.catch((error) => {
    console.log('Error de conexión:', error);
});

app.use(express.json());

app.use((req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== API_KEY) {
        return res.status(401).json({
            message: 'Unauthorized: API Key inválida o faltante'
        });
    }

    next();
});

const taskSchema = new mongoose.Schema({
    task: String,
    deadline: String
});

const goalSchema = new mongoose.Schema({
    goal: String,
    deadline: String
});

const Task = mongoose.model('Task', taskSchema);
const Goal = mongoose.model('Goal', goalSchema);

app.get('/getTasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener tareas'
        });
    }
});

app.get('/getGoals', async (req, res) => {
    try {
        const goals = await Goal.find();
        res.json(goals);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener metas'
        });
    }
});

app.post('/addTask', async (req, res) => {
    const { task, deadline } = req.body;

    if (!task || !deadline) {
        return res.status(400).json({
            message: 'Task y deadline son requeridos'
        });
    }

    try {
        const newTask = new Task({
            task,
            deadline
        });

        await newTask.save();

        res.status(201).json({
            message: 'Tarea agregada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al agregar tarea'
        });
    }
});

app.post('/addGoal', async (req, res) => {
    const { goal, deadline } = req.body;

    if (!goal || !deadline) {
        return res.status(400).json({
            message: 'Goal y deadline son requeridos'
        });
    }

    try {
        const newGoal = new Goal({
            goal,
            deadline
        });

        await newGoal.save();

        res.status(201).json({
            message: 'Meta agregada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al agregar meta'
        });
    }
});

app.delete('/removeTask/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Task.findByIdAndDelete(id);

        res.json({
            message: 'Tarea eliminada'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar tarea'
        });
    }
});

app.delete('/removeGoal/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Goal.findByIdAndDelete(id);

        res.json({
            message: 'Meta eliminada'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar meta'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});