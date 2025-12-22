import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config();

let isConnected = false;

const connectToDb = async () => {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(process.env.DB_URI,{
            bufferCommands:false
        });
        isConnected = db.connections[0].readyState ===1;
        console.log("DB CONNECTED!!");
    } catch (error) {
        console.log('Error connecting to DB: ', error);
        process.exit(1);
    }
}
export default connectToDb;