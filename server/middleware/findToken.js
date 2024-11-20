import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const findToken = async (req, res, next) => {
    try {
        const token = req.header('AuthToken' || 'authToken');
        if (!token) {
            return res.status(401).send({ message: 'Access denied. No token provided.' });
        }
        const secrete = process.env.SECRETE_KEY;
        const decoded = jwt.verify(token, secrete);
        req.user = decoded.userId.id;
        next();
    } catch (error) {
        res.status(400).send({ error: 'Internal Error Occurred' });
        console.log(error);
    }
};

export default findToken;