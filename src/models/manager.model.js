const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const managerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
      enum: [1, 2],
    },
  },
  { timestamps: true }
);
// export default mongoose.model('Cause', managerSchema);
const Manager = mongoose.model("managers", managerSchema);

module.exports = Manager;
