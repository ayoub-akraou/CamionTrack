import configService from "../services/configuration.service.js";

class ConfigurationController {
  static async getConfiguration(req, res) {
    try {
      const config = await configService.getConfiguration();
      res.status(200).json({
        success: true,
        data: config,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Erreur lors de la récupération de la configuration: ${error.message}`,
      });
    }
  }

  static async updateConfiguration(req, res) {
    try {
      const updateData = req.body;
      const updatedConfig = await configService.updateConfiguration(updateData);

      res.status(200).json({
        success: true,
        data: updatedConfig,
        message: "Configuration mise à jour avec succès",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: `Erreur lors de la mise à jour de la configuration: ${error.message}`,
      });
    }
  }
}

export default ConfigurationController;
