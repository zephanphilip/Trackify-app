const express = require('express');
const jwt = require('jsonwebtoken');
const IncomeModel = require('../models/Income.js');

const incomeRouter = express.Router();

incomeRouter.post("/incomeadd", async (req, res) => {
  try {
    const incomeInfo = new IncomeModel(req.body);
    await incomeInfo.save();
    res.status(200).json({ message: "Income created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

incomeRouter.get("/incomeget", async (req, res) => {
  try {
      const response = await IncomeModel.find({})
      res.json(response);
  } catch(err){
      res.json(err);
  }
})

incomeRouter.get("/income/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await IncomeModel.findById(id);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

incomeRouter.put("/incomeupdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { iamount, idescription } = req.body;

    const updatedIncome = await IncomeModel.findByIdAndUpdate(
      id,
      { iamount, idescription },
      { new: true }
    );

    res.json(updatedIncome);
  } catch (err) {
    res.json(err);
  }
});

incomeRouter.delete("/incomedel/:id", (req, res) => {
  const { id } = req.params;
  IncomeModel.findOneAndDelete({ _id: id })
    .then(deletedIncome => {
      if (deletedIncome) {
        res.json({ message: "Income deleted successfully" });
      } else {
        res.json({ message: "Income not found" });
      }
    })
    .catch(err => res.json(err));
});


module.exports = incomeRouter;


// // import express from 'express';
// // import mongoose from 'mongoose';
// // import { IncomeModel } from "../models/Income.js";
// // import { UserModel } from '../models/Users.js';


// // const router = express.Router();

// // router.route("./incomes").post(function(req, res) {
// //     const iamount = req.body.iamount;
// //     const idescription = req.body.idescription;
// //     const incomeinfo = new income1({
// //         iamount,
// //         idescription
// //     })
// //     incomeinfo.save();
// // })


// // export {router as incomeRouter};
// const express = require('express')
// const jwt = require('jsonwebtoken');
// const IncomeModel = require('../models/Income.js');
// // import mongoose from 'mongoose';
// // import { UserModel } from '../models/Users.js';

// const router = express.Router();



// router.post("/incomeadd", async (req, res) => {
//   try {
//     const incomeInfo = new IncomeModel(req.body);
//     await incomeInfo.save();
//     res.status(200).json({ message: "Income created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/incomeget", async (req, res) => {
//   try {
//       const response = await IncomeModel.find({})
//       res.json(response);
//   } catch(err){
//       res.json(err);
//   }
// })

// router.get("/income/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await IncomeModel.findById(id);
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.put("/incomeupdate/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { iamount, idescription } = req.body;

//     const updatedIncome = await IncomeModel.findByIdAndUpdate(
//       id,
//       { iamount, idescription },
//       { new: true }
//     );

//     res.json(updatedIncome);
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.delete("/incomedel/:id", (req, res) => {
//   const { id } = req.params;
//   IncomeModel.findOneAndDelete({ _id: id })
//     .then(deletedIncome => {
//       if (deletedIncome) {
//         res.json({ message: "Income deleted successfully" });
//       } else {
//         res.json({ message: "Income not found" });
//       }
//     })
//     .catch(err => res.json(err));
// });


// module.exports = incomeRouter;

// export { router as incomeRouter };



