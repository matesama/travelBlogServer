import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Insert your name']
    },
    email: {
        type: String,
        required: [true]
        //validate email
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);
export default User;