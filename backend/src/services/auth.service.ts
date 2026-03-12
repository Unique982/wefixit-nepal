// services/auth.service.ts

import { MESSAGES } from "../constants/messages";
import User from "../models/user.model";

class UserServices {
  static async createUserService(data: any) {
    const existUser = await User.findOne({ email: data.email });
    // erro ma chai throe new Error garnu parxa
    if (existUser) throw new Error(MESSAGES.INVALID_CREDENTIALS);

    const user = await User.create(data);
    return user; // return chai oly success vya paxi mtw retunr
  }
  static async getUserService() {
    return await User.find();
  }
}
export default UserServices;
