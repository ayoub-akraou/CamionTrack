import configService from "../services/configuration.service.js";

class ConfigurationController {
  static async getConfiguration(req, res) {
    const config = await configService.getConfiguration();

    res.status(200).json({
      success: true,
      data: config,
    });
  }

  static async updateConfiguration(req, res) {
    const updateData = req.body;
    const updatedConfig = await configService.updateConfiguration(updateData);

    res.status(200).json({
      success: true,
      data: updatedConfig,
      message: "Configuration mise à jour avec succès",
    });
  }
}

export default ConfigurationController;
