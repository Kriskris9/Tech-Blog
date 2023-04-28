const { Comment } = require('../models');

const commentData = [
  {
    "comment": "This is a great post!",
    "user_id": 3,
    "post_id": 1,
  },
  {
    "comment": "I learned so much from this article.",
    "user_id": 2,
    "post_id": 2,
  },
  {
    "comment": "Thanks for sharing this informative post!",
    "user_id": 1,
    "post_id": 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;