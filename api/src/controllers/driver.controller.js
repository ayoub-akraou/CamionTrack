import DriverService from "../services/driver.service.js";

export default class DriverController {
  static async getDrivers(req, res) {
    const drivers = await DriverService.getDrivers();
    res.status(200).json({ success: true, data: drivers });
  }
}