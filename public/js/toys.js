// var myFunko = {
//     background: '../images/marvel-back.jpg',
//     head: '../images/Funko-Pop/BlackPanther/BPantherHead.png',
//     body: '../images/Funko-Pop/BlackPanther/BPantherBody.png',
//     legs: '../images/Funko-Pop/BlackPanther/BPantherLegs.png',
// };

var myFunko = require('./app');

$(document).ready(function () {


    var postBackground = myFunko.background;
    var postHead = myFunko.head;
    var postBody = myFunko.torso;
    var postLegs = myFunko.legs;
    console.log("asdfasdf")
    $("#charSubmit").on("click", function postNewCharacter(event) {
        event.preventDefault();

        console.log("Hello!!!");
        var newCharacter = {
            background: postBackground,
            head: postHead,
            body: postBody,
            legs: postLegs
        };

        function addCharacter(character) {
            $.post("/api/characters/", character, function () {
                console.log(character);
            });
        };

        addCharacter(newCharacter);

    })
});




//SAM COMMENT:  Hey I commented this out because I believe this is the same code from character.js, I placed the code the enter the characters into the database above.  We can discuss Monday how we want to apporach this.
// module.exports = function(sequelize, DataTypes) {
//     var Toy = sequelize.define("Post", {
//       head: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [1]
//         }
//       },
//       body: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         len: [1]
//       },
//       legs: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         len: [1]
//       },
//       background: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         len: [1]
//       },
//     }, {
//         timestamps: false
//     });
  
//     // Toy.associate = function(models) {
//     //     Toy.belongsTo(models.User, {
//     //         foreignKey : 'id',
//     //         sourceKey: 'userId'
//     //     });
//       // We're saying that a Post should belong to an Author
//       // A Post can't be created without an Author due to the foreign key constraint
//     //   Toy.belongsTo(models.User, {
//     //     foreignKey: {
//     //       allowNull: false
//     //     }
//     //   });
//     // };
  
//     return Toy;
//   };
  

