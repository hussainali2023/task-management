import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    creadedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})

export const SubTask = mongoose.model("SubTask", subtaskSchema);