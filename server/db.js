import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const ConnectionString = process.env.CONNECTION_STRING;

const ConnectToDatabase = async () => {
    try {
        await mongoose.connect(ConnectionString);
        console.log('Connected To Database');
    } catch (error) {
        console.log('Failed To Connect');
    }
}

export default ConnectToDatabase;