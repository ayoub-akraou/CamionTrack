import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export default class UserRepository {
  static async findByEmail(email, selectPassword = false) {
    const user = (
      await UserModel.findOne({ email }).select(
        selectPassword ? "+password" : "-password"
      )
    )?.toObject();
    return user;
  }

  static async createUser(data) {
    const { password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ ...data, password: hashedPassword });
    delete user.password;
    await user.save();
    return user;
  }

  static async findAllByRole(role) {
    return await UserModel.find({ role }).select("-password");
  }
}
