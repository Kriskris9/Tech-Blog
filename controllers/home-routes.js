const router = require('express').Router();
const { Post, Comment, User} = require('../models');
const withAuth = require('../utils/withAuth');


router.get('/', withAuth, async (req, res) => {
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

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            }},
            {include: [{model: User, attributes: ['username']} ,{model: Comment, include: [{model: User, attributes: ['username']}]}
        ]
        });
        const post = postData.get({ plain: true });
        res.render('post', { post,
            logged_in: req.session.logged_in });
        res.status(200).json([post]);
        console.log(post);
    } catch (err) { 
        res.status(500).json(err);
}});

router.get('/login', async (req, res) => { 
    if (req.session.logged_in) {
        console.log("you are logged in");
        res.redirect('/');
        return;
    }
    res.render('login');
});
    

module.exports = router; 