import { Schema, model } from "mongoose";

const vehicleSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["truck", "trailer"],
      required: true,
    },

    plateNumber: {
      type: String,
      required: true,
      unique: true,
    },

    model: String,

    // kilométrage
    odometer: {
      type: Number,
      default: 0,
    },

    fuelConsumptionPer100Km: {
      type: Number,
    },

    lastOilChange: { type: Date, required: true }, // vidange
    lastTireCheck: { type: Date, required: true }, // pneus
    lastBrakeCheck: { type: Date, required: true }, // frein

    status: {
      type: String,
      enum: ["available", "on_trip", "maintenance"],
      default: "available",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

export default model("Vehicle", vehicleSchema);
