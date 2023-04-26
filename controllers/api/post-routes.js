const router = require('express').Router();
const { Post, User } = require('../../models');

router.post('/', async (req, res) => {
    try{
        const postData = await Post.create({
            user_id: req.session.user_id,
            title: req.body.title,
            date_created: req.body.date_created,
        });
        res.status(200).json(postData);
        console.log([postData]);
    } catch (err) {
        res.status(400).json(err);
}});



router.put('/:id', async (req, res, next) => {
    try {
      await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      const updatedPost = await Post.findByPk(req.params.id);
      res.json(updatedPost);
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