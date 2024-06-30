const mongoose = require("mongoose")

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'dealer', 'admin', 'superAdmin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },

},{ timestamps: true });
// export default mongoose.model('Cause', userSchema);
const User = mongoose.model('Users', userSchema);

module.exports = User;

