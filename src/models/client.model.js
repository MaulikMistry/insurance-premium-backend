const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nameProposer: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// export default mongoose.model('Cause', clientSchema);
const Client = mongoose.model("Clients", clientSchema);

module.exports = Client;
