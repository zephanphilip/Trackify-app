const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/Users.js');

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, password, ...rest } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword, ...rest });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

userRouter.get("/profile", async (req, res) => {
  try {
      const response = await UserModel.find({})
      res.json(response);
  } catch(err){
      res.json(err);
  }
})

userRouter.put("/profileupdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, place, age, education, email, phoneno } = req.body;

    const updatedProfile = await UserModel.findByIdAndUpdate(
      id,
      { name, place, age, education, email, phoneno },
      { new: true }
    );

    res.json(updatedProfile);
  } catch (err) {
    res.json(err);
  }
});
userRouter.put("/profileblock/:id", async (req, res) => {
  const id = req.params;

  // Assuming you have a User model/schema defined
  UserModel.findByIdAndUpdate(id, { block: true }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

userRouter.delete("/profile/:id", (req, res) => {
  const { id } = req.params;
  UserModel.findOneAndDelete({ _id: id })
    .then(deletedUser => {
      if (deletedUser) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.json({ message: "User not found" });
      }
    })
    .catch(err => res.json(err));
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports.verifyToken = verifyToken;

module.exports = userRouter;



// const express = require('express')
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const UserModel = require('../models/Users.js');

// const router = express.Router();


// router.post("/register", async (req, res) => {
//   const { username, password, ...rest } = req.body;
//   const user = await UserModel.findOne({ username });
//   if (user) {
//     return res.status(400).json({ message: "Username already exists" });
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new UserModel({ username, password: hashedPassword, ...rest });
//   await newUser.save();
//   res.json({ message: "User registered successfully" });
// });

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await UserModel.findOne({ username });

//   if (!user) {
//     return res
//       .status(400)
//       .json({ message: "Username or password is incorrect" });
//   }
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res
//       .status(400)
//       .json({ message: "Username or password is incorrect" });
//   }
//   const token = jwt.sign({ id: user._id }, "secret");
//   res.json({ token, userID: user._id });
// });

// router.get("/profile", async (req, res) => {
//   try {
//       const response = await UserModel.find({})
//       res.json(response);
//   } catch(err){
//       res.json(err);
//   }
// })


// router.put("/profileupdate/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, place,age,education,email,phoneno } = req.body;

//     const updatedProfile = await UserModel.findByIdAndUpdate(
//       id,
//       { name, place,age,education,email,phoneno},
//       { new: true }
//     );

//     res.json(updatedProfile);
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.delete("/profile/:id", (req, res) => {
//   const { id } = req.params;
//   UserModel.findOneAndDelete({ _id: id })
//     .then(deletedUser => {
//       if (deletedUser) {
//         res.json({ message: "User deleted successfully" });
//       } else {
//         res.json({ message: "User not found" });
//       }
//     })
//     .catch(err => res.json(err));
// });


// module.exports = userRouter;

// // export { router as userRouter };

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     jwt.verify(authHeader, "secret", (err) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
// module.exports.verifyToken = verifyToken;
