const express = require("express");
const {
  loginUser,
  signupUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  getAllUsers,
} = require("../controllers/userController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Middleware to check authorized request
// router.use(requireAuth)

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.get("/users/:id", getUsers);

router.get("/users", getAllUsers);

router.get("/single/:id", getSingleUser);

router.put("/single/:id", updateSingleUser);

module.exports = router;
