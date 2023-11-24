const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
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
  Kibi_LocationId: {
    type: String,
    required: true,
  },
  LocationName: {
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

const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
