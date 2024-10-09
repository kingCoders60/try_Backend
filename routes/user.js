const express = require("express");
const router = express.Router();

const { signup } = require("../Controllers/Auth");
const { login } = require("../Controllers/Login");

const { auth, isStudent, isAdmin } = require("../middlewares/auth");
router.post("/login", login);
router.post("/signup", signup);

router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for TESTS",
    })
})
//This is how we  create a MiddleWare..
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Prtotected route for Student",
    });

    router.get("/admin", auth, isAdmin, (req, res) => {
        res.json({
            success: true,
            message: "Welcome to the Protected Route for the Admin.."
        })
    })
})
module.exports = router;
