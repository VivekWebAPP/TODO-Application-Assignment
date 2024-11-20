import mongoose from "mongoose";

const TaskModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    color: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
}, { timestamps: true });

const Task = mongoose.model('Task', TaskModel);

export default Task;