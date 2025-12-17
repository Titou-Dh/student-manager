const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  class: {
    type: String,
    trim: true,
  },
  grade: {
    type: Number,
    min: 0,
    max: 100,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);

