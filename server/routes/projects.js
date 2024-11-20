import express from 'express';
import { body, validationResult } from 'express-validator';
import findToken from '../middleware/findToken.js';
import Project from '../models/ProjectsModel.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/getAllProject', findToken, async (req, res) => {
    try {
        const userId = await req.user;
        if (!userId) {
            return res.status(400).json({ message: 'User not found' });
        }
        const project = await Project.find({ user: userId });
        res.status(200).send({ project });
    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
        console.log(error);
    }
});

router.post('/createANewProject', findToken, [
    body('name').isLength(3).isString().withMessage('Enter A Valid Name'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name } = req.body;
        const currentDateTime = new Date();

        const year = currentDateTime.getFullYear();
        const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDateTime.getDate().toString().padStart(2, '0');

        const hours = currentDateTime.getHours().toString().padStart(2, '0');
        const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentDateTime.getSeconds().toString().padStart(2, '0');

        const DATE = `${year}-${month}-${day}`;
        const TIME = `${hours}:${minutes}:${seconds}`;

        const project = new Project({ name, creationDate: DATE, creationTime: TIME, user: req.user });
        await project.save();
        res.status(201).send({ project });
    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
        console.log(error);
    }
});

router.put('/updateAProject/:id', findToken, [
    body('name').isLength(3).isString().withMessage('Enter A Valid Name'),
], async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { name } = req.body;
        const userId = await req.user;
        const projectId = req.params.id;
        let project = await Project.findById(projectId);
        let updateProject = {};
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }
        if (project.user.toString() !== userId) {
            return res.status(403).send({ error: 'Access Denied' });
        }
        if (name) {
            updateProject.name = name;
        }
        updateProject.creationDate = project.creationDate;
        updateProject.creationTime = project.creationTime;
        project = await Project.findByIdAndUpdate(projectId, updateProject, { new: true });
        res.status(200).send({ project });

    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
        console.log(error);
    }
});

router.delete('/deleteAProject/:id', findToken, async (req, res) => {
    try {
        const userId = await req.user;
        if (!userId) {
            return res.status(403).send({ error: 'Access Denied' });
        }
        const projectId = req.params.id;
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }
        res.status(200).send({ project: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
        console.log(error);
    }
});

export default router;