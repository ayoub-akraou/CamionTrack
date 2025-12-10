import { Schema, model } from "mongoose";

const configurationSchema = new Schema(
  {
    maintenanceRules: {
      vidangeKm: { type: Number, default: 15000 },
      revisionKm: { type: Number, default: 30000 },
      pneuKm: { type: Number, default: 60000 },
      alertBeforeKm: { type: Number, default: 1000 },
    },

    fuelRules: {
      minFuelAlert: { type: Number, default: 50 }, // L
    },

    general: {
      companyName: { type: String, default: "Transport SARL" },
      timezone: { type: String, default: "Africa/Casablanca" },
      notificationsEmail: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default model("Configuration", configurationSchema);
