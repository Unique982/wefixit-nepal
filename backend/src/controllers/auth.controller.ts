//
import { Request, Response } from "express";
import User from "../models/user.model";
import UserServices from "../services/auth.service";
import { sendError, sendSuccess } from "../utils/response";
import { MESSAGES } from "../constants/messages";
import { STATUS_CODES } from "../constants/statusCodes";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    const user = await UserServices.createUserService(req.body);
    // caontroller calls service
    if (!user) return sendError(res, MESSAGES.INTERNAL_SERVER_ERROR); // res.status(200).josn({message:"sagshags"})
    return sendSuccess(res, user, MESSAGES.SUCCESS, STATUS_CODES.CREATED);
  }
  static async loginUser(req: Request, res: Response) {
    //   const { email, password } = req.body;
    //   if (!email || !password) {
    //     return res
    //       .status(400)
    //       .json({ message: "Email and password are required" });
    //   }
    //   // Find user by email
    //   const user = await User.findOne({ email }).select("+password");
    //   if (!user) {
    //     return res.status(404).json({ message: "User not found" });
    //   }
    //   // Compare password
    //   const isMatch = await bcrypt.compare(password, user.password!);
    //   if (!isMatch) {
    //     return res.status(401).json({ message: "Invalid credentials" });
    //   }
    //   // Generate JWT
    //   const token = jwt.sign(
    //     { userId: user._id, role: user.role },
    //     process.env.JWT_SECRET || "secret",
    //     { expiresIn: "7d" }
    //   );
    //   res.status(200).json({
    //     message: "Login successful",
    //     token,
    //     user: {
    //       id: user._id,
    //       name: user.name,
    //       email: user.email,
    //       role: user.role,
    //     },
    //   });
    // }
    // catch(error) {
    //   console.error(error);
    //   res.status(500).json({ message: "Server error" });
    // }
  }

  static async forgotPassword(req: Request, res: Response) {}
  static async verifyOtp(req: Request, res: Response) {}
  static async newPassword(req: Request, res: Response) {}
  static async profileUpdate(req: Request, res: Response) {}
  static async updatePassword(req: Request, res: Response) {}
}

export default AuthController;
