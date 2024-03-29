const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  Kibi_User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  Kibi_CompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
    required: true,
  },
  Kibi_ClassId: {
    type: String,
    required: true,
  },
  ClassName: {
    type: String,
    required: true,
  },
  Kibi_AvailableForSelection: {
    type: Boolean,
    default: false,
  },
  Id: {
    type: String,
    required: true,
  },
});

const Class = mongoose.model("Class", ClassSchema);
module.exports = Class;
