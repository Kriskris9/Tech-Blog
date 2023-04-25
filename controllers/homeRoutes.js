const router = require('express').Router();
const { Post, Comment, User} = require('../models');
const withAuth = require('../utils/withAuth');


router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{ model: Post }, { model: Comment }, ]
        });
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('homepage', { users,
        logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/postData', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User
            
            }]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('post', { posts,
            logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }

});



router.get('/comments', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: User }]
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render('memes', { comments,
        logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', async (req, res) => { 
    if (req.session.logged_in) {
        console.log("you are logged in");
        res.redirect('/');
        return;
    }
    res.render('login');
});
    

module.exports = router; 