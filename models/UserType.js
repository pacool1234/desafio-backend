const mongoose = require("mongoose");
// const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserType = mongoose.model("UserType", UserTypeSchema);

module.exports = UserType;
