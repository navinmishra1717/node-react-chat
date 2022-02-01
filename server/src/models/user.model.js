// user schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const User = new schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    type: { type: String, enum: ["consumer", "support"] },
    password: { type: String, required: true },
    // roles: [{ type: String, required: true }],
    isActive: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// write methods here
// if we use arrow function, this property will be lost
User.methods.create = function() {
  return new Promise((resolve, reject) => {
    this.save(function(err, user) {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
};

module.exports = mongoose.model("User", User);
