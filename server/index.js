import express from 'express';
import cors from 'cors';
import ConnectToDatabase from './db.js';
import authRouter from './routes/auth.js';
import taskRouter from './routes/tasks.js';
import projectRouter from './routes/projects.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;
const assiginedOrigin = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    'https://todo-application-assignment-sigma.vercel.app',
]

ConnectToDatabase();

app.use(cors({
    origin: assiginedOrigin, // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // If your requests include credentials like cookies
}));
app.use(express.json());


app.use('/auth', authRouter);
app.use('/tasks', taskRouter);
app.use('/project',projectRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port} and Server link http://localhost:${port}/`);
});