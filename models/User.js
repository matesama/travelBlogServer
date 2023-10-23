import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Insert your name']
    },
    email: {
        type: String,
        required: [true, "Please insert a valid password"],
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
        lowercase: true,
        trim: true
        //validate email
    },
    password: {
        type: String,
        required: [true, "Please insert a valid password"]
    }
})

const User = mongoose.model('User', UserSchema);
export default User;