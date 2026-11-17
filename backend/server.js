
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// READ: Get all tasks
app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json(results);
    });
});

// CREATE: Add a task
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ message: 'Title is required' });
    }

    db.query(
        'INSERT INTO tasks (title, completed) VALUES (?, false)',
        [title.trim()],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            res.status(201).json({
                id: result.insertId,
                title: title.trim(),
                completed: false
            });
        }
    );
});

// UPDATE: Mark a task as completed
app.put('/api/tasks/:id', (req, res) => {
    db.query(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        [req.body.completed, req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.json({ message: 'Task updated successfully' });
        }
    );
});

// DELETE: Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    db.query(
        'DELETE FROM tasks WHERE id = ?',
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.json({ message: 'Task deleted successfully' });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
