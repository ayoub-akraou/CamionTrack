import configRepository from "../repositories/configuration.repository.js";

class ConfigurationService {
  static async getConfiguration() {
    return await configRepository.getConfiguration();
  }

  static async updateConfiguration(updateData) {
    // Validation des données
    if (updateData.maintenanceRules) {
      const maintenance = updateData.maintenanceRules;
      if (maintenance.vidangeKm && typeof maintenance.vidangeKm !== "number") {
        throw new Error("vidangeKm doit être un nombre");
      }
      if (
        maintenance.revisionKm &&
        typeof maintenance.revisionKm !== "number"
      ) {
        throw new Error("revisionKm doit être un nombre");
      }
      if (maintenance.pneuKm && typeof maintenance.pneuKm !== "number") {
        throw new Error("pneuKm doit être un nombre");
      }
      if (
        maintenance.alertBeforeKm &&
        typeof maintenance.alertBeforeKm !== "number"
      ) {
        throw new Error("alertBeforeKm doit être un nombre");
      }
    }

    if (
      updateData.fuelRules?.minFuelAlert &&
      typeof updateData.fuelRules.minFuelAlert !== "number"
    ) {
      throw new Error("minFuelAlert doit être un nombre");
    }

    return await configRepository.updateConfiguration(updateData);
  }
}

export default ConfigurationService;
