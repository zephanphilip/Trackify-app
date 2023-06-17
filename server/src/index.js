import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from './routes/users.js';
import {incomeRouter} from './routes/income.js';
import { expenseRouter } from './routes/expense.js';
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors());

// app.use("/auth", userRouter);
// app.use("/add", incomeRouter);
// app.use("/add", expenseRouter);

app.use("/api/auth", require("./routes/users"));
app.use("/api/add", require("./routes/income"));
app.use("/api/add", require("./routes/expense"));


app.use(express.static(path.join(__dirname,'/build')));

app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname 
    ,'/build/index.html')); }); 

mongoose.connect("mongodb+srv://123:123@cluster0.pvpoxvw.mongodb.net/Cluster0?retryWrites=true&w=majority");

app.listen(3001,()=> console.log('server listening on'));
