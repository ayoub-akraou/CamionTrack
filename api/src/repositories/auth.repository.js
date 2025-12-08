import UserModel from "../models/user.model.js";

export default class UserRepository {
  static async findByEmail(email, selectPassword = false) {
    const user = (
      await UserModel.findOne({ email }).select(
        selectPassword ? "+password" : "-password"
      )
    )?.toObject();
    return user;
  }

}
