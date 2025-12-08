import UserRepository from "../repositories/auth.repository.js";

export default class AuthService {
  static async register(data) {
    const { email } = data;
    const isAlreadyExist = await UserRepository.findByEmail(email);

    if (isAlreadyExist) {
      const error = new Error(
        "email already exist! use another email or login!"
      );
      error.statusCode = 400;
      throw error;
    }

    const user = await UserRepository.createUser(data);
    return user;
  }
}
