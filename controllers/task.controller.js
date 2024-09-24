import { Task } from "../models/task.model.js";
import { UserTask } from "../models/userTask.model.js";

export const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json("User not found")
        }

        let userTask = await UserTask.findOne({ user: userId })

        if (!userTask) {
            userTask = await UserTask.create({ user: userId })
        }

        const task = new Task({ title, description, status });
        userTask.tasks.push(task._id)

        await Promise.all([task.save(), userTask.save()])



        return res.status(201).json({ task });

    } catch (error) {
        console.log("error in the createTask controller", error)
        res.status(500).json(error.message);
    }
}

export const getTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json("User not found")
        }

        let userTask = await UserTask.findOne({ user: userId }).populate("tasks")

        if (!userTask) {
            return res.status(404).json("No task found")
        }

        return res.status(200).json(userTask.tasks);

    } catch (error) {
        console.log("error in the getTasks controller", error)
        res.status(500).json(error.message);
    }
}

export const updateTask = async (req, res) => {
    const { title, description, status } = req.body;

    try {

        const updateId = req.params.id;
        if (!updateId) {
            return res.status(404).json("Id not found")
        }

        let task = await Task.findById(updateId);
        if (!task) {
            return res.status(404).json("Task not found")
        }

        const updatedTask = await Task.findByIdAndUpdate(updateId, {
            $set: {
                title, description, status
            }
        }, { new: true })

        return res.status(200).json("Task updated successfully")

    } catch (error) {
        console.log("error in the updateTask controller", error)
        res.status(500).json(error.message)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deleteId = req.params.id;
        const userId = req.user._id;
        if (!deleteId) {
            return res.status(404).json("Id not found")
        }

        let task = await Task.findById(deleteId);
        if (!task) {
            return res.status(404).json("Task not found")
        }

        const result = await UserTask.updateOne({
            user: userId
        }, { $pull: { tasks: deleteId } })
        

        await Task.findByIdAndDelete(deleteId)


        return res.status(200).json("Task deleted successfully")

    } catch (error) {
        console.log("error in the deleteTask controller", error)
        res.status(500).json(error.message)
    }
}
