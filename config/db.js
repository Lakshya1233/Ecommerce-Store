import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to host ${conn.connection.host}`.bgMagenta.white);

    } catch (error) {
        console.log(`ERROR IN MONGODB ${error}`.bgRed.white)
    }
}
export default connectDB;