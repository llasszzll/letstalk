const express = require('express');
const router = express.Router();

const Post = require('../models/post');


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

router.get('/blog', async (req, res) => {
    try {
        const locals = {
            title: "Blog",
            description: "LTS | Blog"
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('blog', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            isActiveRoute: '/'
        });
    } catch (error) {
        console.log(error);
    }
});

// ROUTE FOR POST ID
router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug })
        const locals = {
            title: data.title,
            description: "Blog Post",
            currentRoute: `/post/${slug}`

        }
        res.render('post', { locals, data })

    } catch (error) {
        console.log(error);
    }
});

router.get('/about', (req, res) => {
    res.render('about', {
        currentRoute: '/about'
    });
});


router.get('/service', (req, res) => {
    res.render('service', {
        currentRoute: '/service'
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        currentRoute: '/contact'
    });
});

module.exports = router;