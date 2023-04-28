const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  {
    "username": "JohnDoe",
    "email": "john@example.com",
    "password": "password1",
  },
  {
    "username": "Mike",
    "email": "mike@example.com",
    "password": "password2",
  },
  {
    "username": "Alice",
    "email": "alice@example.com",
    "password": "password3",
  },
];

const seedUsers = async () => {
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  };
  
module.exports = seedUsers;
