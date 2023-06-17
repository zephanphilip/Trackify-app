const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());

// Routes
const userRouter = require("./routes/users.js");
const incomeRouter = require("./routes/income.js");
const expenseRouter = require("./routes/expense.js");

app.use("/api/auth", userRouter);
app.use("/api/add", incomeRouter);
app.use("/api/add", expenseRouter);

// Serve static files
app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname, '../build', 'index.html')); 
});




// Connect to MongoDB
mongoose.connect("mongodb+srv://123:123@cluster0.pvpoxvw.mongodb.net/Cluster0?retryWrites=true&w=majority")
  .then(() => {
    // Start the server
    app.listen(3001, () => console.log('Server listening on port 3001'));
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// const app = express();


// app.use(express.json());
// app.use(cors());

// // app.use("/auth", userRouter);
// // app.use("/add", incomeRouter);
// // app.use("/add", expenseRouter);

// app.use("/api/auth", require("./routes/users.js"));
// app.use("/api/add", require("./routes/income.js"));
// app.use("/api/add", require("./routes/expense.js"));


// app.use(express.static(path.join(__dirname,'/build')));

// app.get('/*', function(req, res) { 
//     res.sendFile(path.join(__dirname 
//     ,'/build/index.html')); }); 

// mongoose.connect("mongodb+srv://123:123@cluster0.pvpoxvw.mongodb.net/Cluster0?retryWrites=true&w=majority");

// app.listen(3001,()=> console.log('server listening on'));
