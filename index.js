const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// API KEY
const API_KEY = "12345";

// Base de datos temporal
let tasks = [];

// Middleware para validar API KEY
app.use((req, res, next) => {
    const apiKey = req.headers['api-key'];

    if (apiKey !== API_KEY) {
        return res.status(401).json({ message: "API Key incorrecta" });
    }

    next();
});

// Obtener tareas
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// Agregar tarea
app.post('/tasks', (req, res) => {
    const { title, goal, deadline } = req.body;

    if (!title || !goal || !deadline) {
        return res.status(400).json({
            message: "Parámetros incorrectos"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        goal,
        deadline
    };

    tasks.push(newTask);

    res.status(200).json({
        message: "Tarea agregada correctamente",
        task: newTask
    });
});

// Eliminar tarea
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(400).json({
            message: "ID inválido"
        });
    }

    tasks.splice(taskIndex, 1);

    res.status(200).json({
        message: "Tarea eliminada correctamente"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});