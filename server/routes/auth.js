import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import findToken from '../middleware/findToken.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/login', [
    body('email').isEmail().withMessage('Enter A Vaild Email'),
    body('password').isLength(8).isString().withMessage('Enter A Valid Password'),
], async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid Email or Password' });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ error: 'Invalid Email or Password' });
        }
        const secret = process.env.SECRETE_KEY;
        const data = {
            userId: {
                id: user.id,
            }
        };

        const jwtToken = jwt.sign(data, secret);
        res.status(200).send({ jwtToken });

    } catch (error) {
        res.status(400).send({ error: 'Internal Error Occurred' });
        console.log(error.message);
    }
});

router.post('/sigin', [
    body('name').isLength(5).isString().withMessage('Enter A Valid Name'),
    body('email').isEmail().withMessage('Enter A Vaild Email'),
    body('password').isLength(8).isString().withMessage('Enter A Valid Password'),
], async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'Email Already Exist' });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name: name,
            email: email,
            password: hashPassword,
        });

        const secret = process.env.SECRETE_KEY;
        const data = {
            userId: {
                id: user.id,
            }
        }

        const jwtToken = jwt.sign(data, secret);
        res.status(200).send({ jwtToken });

    } catch (error) {
        res.status(400).send({ error: 'Internal Error Occurred' });
        console.log(error.message);
    }
});

router.get('/getUserDetails', findToken, async (req, res) => {
    const userId = await req.user;
    if (!userId) {
        return res.status(400).json({ error: 'Invalid Token' });
    }
    const user = await User.findById(userId);
    res.status(200).send({ user });
});

export default router;