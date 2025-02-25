const express = require('express');
const router = express.Router();

// const Post = require('../models/post')


// * GET 
// * HOME

router.get('/', async (req, res) => {
    const locals = {
        title: "Home",
        description: "Let's Talk Solutions"
    }
    try {
        // const data = await Post.find();
        res.render('index', { locals });
    } catch (error) {
        console.log(error);
    }
});

// data

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/blog', (req, res) => {
    res.render('blog');
});

router.get('/service', (req, res) => {
    res.render('service');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;