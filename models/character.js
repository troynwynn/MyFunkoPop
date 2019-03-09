module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    head: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    legs: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    background: {
      type: DataTypes.STRING,
      defaultValue: "Placeholder"
    }
  });
  return Character;
};
