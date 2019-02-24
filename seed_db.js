const { Jump, sequelize } = require('./sequelize');

(async () => {
  try {
    await sequelize.sync({force: true}); // Reset database

    const jump_1 = await Jump.create({ data: "Jump" });

    console.log("Success!");
  } catch(err) {
    console.log("ERROR! Try Again!");
  }

  await sequelize.close();
})();
