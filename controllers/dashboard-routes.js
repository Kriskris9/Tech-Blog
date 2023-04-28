const router = require('express').Router();
const { Post, User , Comment} = require('../models/');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where:{ 
                user_id: {
                    [Op.eq]:req.session.userId},
            // include: [{model: User}]
        }});
        const posts = postData.map((post) => post.get({ plain: true }));
        // res.status(200).json(posts);
        res.render('dashboardPosts', { posts,  
        logged_in: req.session.logged_in,
        layout:
        'dashboard'});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/newPost', withAuth, async (req, res) => {
try {
    res.render('newPost', {
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
        const post = postData.get({ plain: true });
        // res.status(200).json(post)
        res.render('editPost', { layout: 'dashboard', post });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
    
        const postData = await Post.findOne({
          
            where: {
            id: req.params.id
          },
          include: [{  model: User, attributes: ['username'] }, {   model: Comment,  include: [{ model: User, attributes: ['username']}] }],
          });

        const posts = postData.get({ plain: true })
        console.log(posts)
        console.log(req.session)
        if (posts.user_id == req.session.userId){
            res.render('editPost', { post: posts,
                logged_in: req.session.logged_in 
            }); 
        }
        else{
                res.render('single-post', { post: posts,
            logged_in: req.session.logged_in 
        }); 
        }
   
        // res.status(200).json([posts]);
        console.log(posts);
    } catch (err) { 
        console.log(err)
        res.status(500).json(err);
}});

module.exports = router;


