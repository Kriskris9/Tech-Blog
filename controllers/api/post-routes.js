const router = require('express').Router();
const { Post, User } = require('../../models');

// routes for api/posts
router.post('/', async (req, res) => {
    try{
      console.log(req.body)
      console.log(req.session)
        const postData = await Post.create({
            user_id: req.session.userId,
            title: req.body.title,
            content: req.body.content,
            // date_created: req.body.date_created,
        });     
         console.log(postData);
         res.redirect('/dashboard')
  
    } catch (err) {
      console.log(err)
        // res.status(400).json(err);
}});



router.post('/edit/:id', async (req, res, next) => {
    try {
      await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      const updatedPost = await Post.findByPk(req.params.id);
      res.redirect('/dashboard')
    } catch (err) {
      next(err);
    }
  });
  
  
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json(postData);
        console.log(postData);
    } catch (err) {
        res.status(500).json(err);
}});

module.exports = router;