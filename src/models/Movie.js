const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('movie', {

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    view: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
  }, {
    timestamps: false,
  });
};
