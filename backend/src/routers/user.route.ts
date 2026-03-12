import express, { Router } from "express";
import AuthController from "../controllers/auth.controller";
const router: Router = express.Router();
// login post
// router.route("/login").post(AuthController);
// register api
router.route("/register").post(AuthController.registerUser);
// forget ap
router.route("/forget").post(AuthController.forgotPassword);
// google login api
// router.route("/google").post(AuthController.)
// opt verify api
router.route("/otp-verfiy").post(AuthController.verifyOtp);
// new password api
router.route("/new-passowrd").patch(AuthController.newPassword);
// update profile
router.route("/update-profile").patch(AuthController.updatePassword);
// password update
router.route("/password-update").patch(AuthController.updatePassword);

export default router;
