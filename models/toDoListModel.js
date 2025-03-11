const mongoose = require('mongoose');

const toDoSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'registerUser'
        },
        text: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false, 
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('toDoList', toDoSchema);
