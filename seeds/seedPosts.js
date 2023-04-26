const { Post } = require('../models');

const postData = [
  {
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "user_id": 2
  },
  {
    "title": "Tips for Effective Time Management",
    "content": "In this post, I'll share some tips on how to manage your time effectively.",
    "user_id": 2
  },
  {
    "title": "The Benefits of a Healthy Lifestyle",
    "content": "Living a healthy lifestyle has many benefits, including improved physical and mental health.",
    "user_id": 2
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;


