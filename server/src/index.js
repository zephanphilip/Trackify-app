

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();


app.use(express.json());
app.use(cors());

// app.use("/auth", userRouter);
// app.use("/add", incomeRouter);
// app.use("/add", expenseRouter);

app.use("/api/auth", require("./routes/users.js"));
app.use("/api/add", require("./routes/income.js"));
app.use("/api/add", require("./routes/expense.js"));


app.use(express.static(path.join(__dirname,'/build')));

app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname 
    ,'/build/index.html')); }); 

mongoose.connect("mongodb+srv://123:123@cluster0.pvpoxvw.mongodb.net/Cluster0?retryWrites=true&w=majority");

app.listen(3001,()=> console.log('server listening on'));
