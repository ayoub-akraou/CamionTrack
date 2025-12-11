import AuthService from "../services/auth.service.js";

export default class AuthController {
  static async register(req, res) {
    const user = await AuthService.register(req.body);
    res.status(201).json({ success: true, data: user });
  }

  static async login(req, res) {
    const data = await AuthService.login(req.body);
    res.status(200).json({ success: true, data });
  }
}
