import UserRepository from "../repositories/user.repository.js";

export default class DriverService {
  static async getDrivers() {
    return await UserRepository.findAllByRole("driver");
  }
}