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

  static async updateConfiguration(updateData) {
    let config = await Configuration.findOne();

    if (!config) {
      config = await Configuration.create(updateData);
    } else {
      config = await Configuration.findOneAndUpdate(
        {}, // filter
        updateData,
        { new: true, runValidators: true }
      );
    }

    return config;
  }
}

export default ConfigurationRepository;
