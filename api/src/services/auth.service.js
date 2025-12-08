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

  static async login(data) {
    const { email, password } = data;
    const user = await UserRepository.findByEmail(email, true);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401; // Unauthorized
      throw error;
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      /* expiresIn: "1d" */
    });

    delete user.password;

    return { user, token };
  }
}
