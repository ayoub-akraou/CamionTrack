import Configuration from "../models/configuration.model.js";

class ConfigurationRepository {
  static async getConfiguration() {
    // get the first config if it exist or create one
    let config = await Configuration.findOne();
    if (!config) {
      config = await Configuration.create({});
    }
    return config;
  }

}

export default ConfigurationRepository;
