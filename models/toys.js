
module.exports = function(sequelize, DataTypes) {
    var Toy = sequelize.define("Post", {
      head: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      legs: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      background: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
    }, {
        timestamps: false
    });
  
    // Toy.associate = function(models) {
    //     Toy.belongsTo(models.User, {
    //         foreignKey : 'id',
    //         sourceKey: 'userId'
    //     });
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
    //   Toy.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return Toy;
  };
  