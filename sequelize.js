const config = require('config');
const db = config.get('db');

const Sequelize = require('sequelize');
const JumpModel = require('./models/jump');
let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres'
  });
} else {
  sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: db
  });
}

const Jump = JumpModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log("Database and tables created");
});

module.exports = {
  Jump,
  sequelize
};
