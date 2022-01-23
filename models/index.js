const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  pool: {
    min: 0,
    max: 5,
    acquire: 5000,
    Idle: 1000,
  },
})

sequelize
  .authenticate()
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log("cannot connect" + err));

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require('./user') (sequelize, Sequelize);
db.news = require('./news') (sequelize, Sequelize);

module.exports = db;