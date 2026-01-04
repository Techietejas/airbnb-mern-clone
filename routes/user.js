const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usersController = require("../controllers/users.js");

router.route("/signup").get(usersController.renderRegister).post(wrapAsync(usersController.registerUser));

router.route("/login").get(usersController.renderLogin).post(
  saveRedirectUrl,
  passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
  usersController.loginUser
);

router.get("/logout", usersController.logoutUser);

module.exports = router;