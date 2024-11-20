import express from 'express';
import { body, validationResult } from 'express-validator';
import findToken from '../middleware/findToken.js';
import Task from '../models/TasksModel.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/getAllTask/:id', findToken, async (req, res) => {
    try {
        const userId = req.user;
        const projectId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: 'User not found' });
        }
        const tasks = await Task.find({ project: projectId, user: userId });
        res.status(200).send({ tasks });
    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
        console.log(error);
    }
});

router.post('/createNewTask/:id', findToken, [
    body('name').isLength(3).isString().withMessage('Enter A Valid Name'),
    body('category').isLength(3).isString().withMessage('Enter A Valid category'),
    body('color').isString().withMessage('Enter A Valid color'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const projectId = req.params.id;
        const { name, category, color } = req.body;
        const task = new Task({ name, category, color, project: projectId, user: req.user });
        await task.save();
        res.status(201).send({ task });
    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
        console.log(error);
    }
});

router.put('/updateATask/:projectid/:id', findToken, [
    body('name').isLength(3).isString().withMessage('Enter A Valid Name'),
    body('category').isLength(3).isString().withMessage('Enter A Valid Category'),
    body('color').isString().withMessage('Enter A Valid color'),
], async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { name, category, isDone, color } = req.body;
        const userId = await req.user;
        const taskId = req.params.id;
        const projectId = req.params.projectid;
        let task = await Task.findById({ project: projectId, _id: taskId });
        let updateTask = {};
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }
        if (task.user.toString() !== userId) {
            return res.status(403).send({ error: 'Access Denied' });
        }
        if (name) {
            updateTask.name = name;
        }
        if (category) {
            updateTask.category = category;
        }
        if (isDone) {
            updateTask.isDone = isDone;
        }
        if (color) {
            updateTask.color = color;
        }
        if (!isDone) {
            updateTask.isDone = false;
        }
        task = await Task.findByIdAndUpdate(taskId, updateTask, { new: true });
        res.status(200).send({ task });

    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
        console.log(error);
    }
});

router.delete('/deleteTask/:projectid/:id', findToken, async (req, res) => {
    try {
        const userId = await req.user;
        const projectId = req.params.projectid;
        if (!userId) {
            return res.status(403).send({ error: 'Access Denied' });
        }
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete({ project: projectId, _id: taskId });
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }
        res.status(200).send({ task: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
        console.log(error);
    }
});

export default router;