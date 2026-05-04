const express = require('express');
const app = express();
const PORT = 3000;

// API Key personalizada
const API_KEY = 'mi_api_key_123';

// Middleware para JSON
app.use(express.json());

// Middleware de autorización
app.use((req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== API_KEY) {
        return res.status(401).json({
            message: 'Unauthorized: API Key inválida o faltante'
        });
    }

    next();
});

// Arreglos temporales
let tasks = [];
let goals = [];

// GET Tasks
app.get('/getTasks', (req, res) => {
    res.json(tasks);
});

// GET Goals
app.get('/getGoals', (req, res) => {
    res.json(goals);
});

// POST Add Task
app.post('/addTask', (req, res) => {
    const { task, deadline } = req.body;

    if (!task || !deadline) {
        return res.status(400).json({
            message: 'Task y deadline son requeridos'
        });
    }

    tasks.push({ task, deadline });

    res.status(201).json({
        message: 'Tarea agregada exitosamente',
        tasks
    });
});

// POST Add Goal
app.post('/addGoal', (req, res) => {
    const { goal, deadline } = req.body;

    if (!goal || !deadline) {
        return res.status(400).json({
            message: 'Goal y deadline son requeridos'
        });
    }

    goals.push({ goal, deadline });

    res.status(201).json({
        message: 'Meta agregada exitosamente',
        goals
    });
});

// DELETE Remove Task
app.delete('/removeTask', (req, res) => {
    const { task } = req.body;

    tasks = tasks.filter(t => t.task !== task);

    res.json({
        message: 'Tarea eliminada',
        tasks
    });
});

// DELETE Remove Goal
app.delete('/removeGoal', (req, res) => {
    const { goal } = req.body;

    goals = goals.filter(g => g.goal !== goal);

    res.json({
        message: 'Meta eliminada',
        goals
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});