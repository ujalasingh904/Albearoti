import mongoose from "mongoose";

const userTaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true,
            default: []
        }
    ],
}, { timestamps: true })

export const UserTask = mongoose.model("UserTask", userTaskSchema);