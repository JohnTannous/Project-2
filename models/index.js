const User = require('./User');
const Workout = require('./Workout');

// User.hasMany(Workout, {
//     foreignKey: 'user_id',
//     // Define an alias for when data is retrieved
//     as: 'user_workouts',
//     onDelete: 'CASCADE'
// });

Workout.belongsTo(User, {
     foreignKey: 'user_id'  
});

User.hasMany( Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
  
  

module.exports = { User, Workout };