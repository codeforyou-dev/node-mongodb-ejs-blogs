const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// List blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render('index', { blogs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Add Blog form
router.get('/add', (req, res) => {
    res.render('add');
});

// Add user
router.post('/add', async (req, res) => {
    try {
        await Blog.create(req.body);
        res.redirect('/blogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Edit user form
router.get('/edit/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('edit', { blog });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update user
router.post('/edit/:id', async (req, res) => {
    console.log('edit',req.params.id);
    try {
        await Blog.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/blogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete user
router.get('/delete/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/blogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;