import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from './routes/users.js';
import {incomeRouter} from './routes/income.js';
import { expenseRouter } from './routes/expense.js';
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/add", incomeRouter);
app.use("/add", expenseRouter);

mongoose.connect("mongodb+srv://123:123@cluster0.pvpoxvw.mongodb.net/Cluster0?retryWrites=true&w=majority");

app.listen(3001,()=> console.log('server listening on'));
