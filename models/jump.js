module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jump', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {underscored: true});
};
