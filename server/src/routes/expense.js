
const express = require('express');
const jwt = require('jsonwebtoken');
const ExpenseModel = require('../models/Expense.js');

const expenseRouter = express.Router();

expenseRouter.post("/expenseadd", async (req, res) => {
  try {
    const expenseInfo = new ExpenseModel(req.body);
    await expenseInfo.save();
    res.status(200).json({ message: "Expense created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

expenseRouter.get("/expenseget", async (req, res) => {
  try {
      const response = await ExpenseModel.find({})
      res.json(response);
  } catch(err){
      res.json( err);
  }
})

expenseRouter.get("/expense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ExpenseModel.findById(id);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

expenseRouter.put("/expenseupdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { eamount, edescription } = req.body;

    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      id,
      { eamount, edescription },
      { new: true }
    );

    res.json(updatedExpense);
  } catch (err) {
    res.json(err);
  }
});

expenseRouter.delete("/expensedel/:id", (req, res) => {
  const { id } = req.params;
  ExpenseModel.findOneAndDelete({ _id: id })
    .then(deletedExpense => {
      if (deletedExpense) {
        res.json({ message: "Income deleted successfully" });
      } else {
        res.json({ message: "Income not found" });
      }
    })
    .catch(err => res.json(err));
});

module.exports = expenseRouter;


// const express = require('express')
// const jwt = require('jsonwebtoken');
// const ExpenseModel = require('../models/Expense.js');

// const router = express.Router();

// router.post("/expenseadd", async (req, res) => {
//   try {
//     const expenseInfo = new ExpenseModel(req.body);
//     await expenseInfo.save();
//     res.status(200).json({ message: "Expense created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/expenseget", async (req, res) => {
//   try {
//       const response = await ExpenseModel.find({})
//       res.json(response);
//   } catch(err){
//       res.json( err);
//   }
// })

// router.get("/expense/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await ExpenseModel.findById(id);
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.put("/expenseupdate/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { eamount, edescription } = req.body;

//     const updatedExpense = await ExpenseModel.findByIdAndUpdate(
//       id,
//       { eamount, edescription },
//       { new: true }
//     );

//     res.json(updatedExpense);
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.delete("/expensedel/:id", (req, res) => {
//   const { id } = req.params;
//   ExpenseModel.findOneAndDelete({ _id: id })
//     .then(deletedExpense => {
//       if (deletedExpense) {
//         res.json({ message: "Income deleted successfully" });
//       } else {
//         res.json({ message: "Income not found" });
//       }
//     })
//     .catch(err => res.json(err));
// });






// module.exports = expenseRouter;
// export { router as expenseRouter };