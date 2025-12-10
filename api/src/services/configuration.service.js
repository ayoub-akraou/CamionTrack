import configRepository from "../repositories/configuration.repository.js";

class ConfigurationService {
  static async getConfiguration() {
    return await configRepository.getConfiguration();
  }

}

export default ConfigurationService;
