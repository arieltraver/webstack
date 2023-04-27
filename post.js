// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the Post schema
const PostSchema = new Schema({
  name: { type: String, required: true },
  year: { type: String, required: true },
  category: { type: String, required: true },  
});

// Sets the createdAt parameter equal to the current time
/*PostSchema.pre('save', (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});*/

// Exports the PostSchema for use elsewhere.
module.exports = mongoose.model('Post', PostSchema);