const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where:{"user_id": req.session.userId},
            include: [{model: User}]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('all-posts', { posts,  
        layout:
        'dashboard',});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newPost', withAuth, async (req, res) => {
try {
    res.render('new-post', {
        layout: 'dashboard'
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{ model: User }]
        });
        const posts = postData.get({ plain: true });
        res.render('edit-post', { layout: 'dashboard', posts });
        console.log([posts]);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            }},
            {include: [{model: User, attributes: ['username']} ,{model: Comment, include: [{model: User, attributes: ['username']}]}
        ]
        });
        const posts = postData.get({ plain: true });
        res.render('post', { posts,
            logged_in: req.session.logged_in });
        res.status(200).json([postData]);
        console.log(postData);
    } catch (err) { 
        res.status(500).json(err);
}});

module.exports = router;


