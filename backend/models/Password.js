// models/User.js
import mongoose from 'mongoose';

const passSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    website: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true, collection: 'Password' });
//
const Pass = mongoose.model('Pass', passSchema);
export default Pass;
