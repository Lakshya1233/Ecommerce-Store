import express from 'express';
import colors from 'colors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { registerController } from './config/controllers/authController.js';

import cors from "cors"

dotenv.config();

//connect db
connectDB();


const app = express()
app.use(bodyParser.json())
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.get('/', (req, res) => {
    res.send(
        "<h1> welcome</h1 >"
    )

})
app.use('/api/v1/product', productRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is fine in ${PORT}`.bgCyan.white);
})