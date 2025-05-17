const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create item
router.post('/items', (req, res) => {
    const { name, description, price, quantity } = req.body;
    
    const query = 'INSERT INTO items (name, description, price, quantity) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, price, quantity], (err, result) => {
        if (err) {
            console.error('Error creating item:', err);
            return res.status(500).json({ error: 'Error creating item' });
        }
        res.status(201).json({ id: result.insertId });
    });
});

// Get all items
router.get('/items', (req, res) => {
    const query = 'SELECT * FROM items';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            return res.status(500).json({ error: 'Error fetching items' });;
        }
        res.json(results);
    });
});

// Get single item
router.get('/items/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM items WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching item:', err);
            return res.status(500).json({ error: 'Error fetching item' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(results[0]);
    });
});

// Update item
router.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const { name, description, price, quantity } = req.body;
    
    const query = 'UPDATE items SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?';
    db.query(query, [name, description, price, quantity, id], (err, result) => {
        if (err) {
            console.error('Error updating item:', err);
            return res.status(500).json({ error: 'Error updating item' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item updated successfully' });
    });
});

// Delete item
router.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM items WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting item:', err);
            return res.status(500).json({ error: 'Error deleting item' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    });
});

module.exports = router;
