const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = ('../views/layouts/admin');
const jwtSecret = process.env.JWT_SECRET;


// GET
// Admin / Login Page

router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "Let's Talk Solutions"
        }
        // const data = await Post.find();
        res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
});

// POST
// Admin / Check Login

router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credentials.' })
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/dashboard');


    } catch (error) {
        console.log(error);
    }
})

// POST
// Admin / Register

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashPassword });
            res.status(201).json({ message: 'User Created', user });
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User Already in User' })
            }
            res.status(500).json({ message: 'Internal Server Error.' })

        }


    } catch (error) {
        console.log(error);
    }
})

// LOGIN ROUTE

// router.post('/admin', async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (req.body.username === "admin" && req.body.password === "password") {
//             res.send()
//         } else {
//             res.send("Wrong Username and Password.")
//         }


//         res.redirect('/admin')

//     } catch (error) {
//         console.log(error);
//     }
// })



module.exports = router;