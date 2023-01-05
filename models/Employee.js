const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Employee = new Schema({
   name: {
      type: String
   },
   age: {
      type: String
   },
   gender: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'employees'
})

module.exports = mongoose.model('Employee', Employee)