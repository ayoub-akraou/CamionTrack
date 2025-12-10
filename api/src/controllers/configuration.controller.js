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

}

export default ConfigurationController;
