import AuthService from "../services/auth.service.js";

export default class AuthController {
  static async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const data = await AuthService.login(req.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message });
    }
  }
}
