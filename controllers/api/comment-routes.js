const router = require('express').Router();
const { Comment, User } = require('../../models/');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
    try{
        const commentData = await Comment.create({
            user_id: req.session.user_id,
            comment: req.body.comment,
            date_created: req.body.date_created,
        });
        res.status(200).json(commentData);
        console.log([commentData]);
    } catch (err) {
        res.status(400).json(err);
}});


router.put('/:id', async (req, res, next) => {
  try {
    await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const updatedComment = await Comment.findByPk(req.params.id);
    res.json(updatedComment);
  } catch (err) {
    next(err);
  }
});



router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.json(commentData);
        console.log(commentData);
    } catch (err) {
        res.status(500).json(err);
}});

module.exports = router;








