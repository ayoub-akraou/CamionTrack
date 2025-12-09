import { Schema, model } from "mongoose";

const tripSchema = new Schema(
  {
    driver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },

    origin: { type: String, required: true },
    destination: { type: String, required: true },

    plannedStart: { type: Date, required: true },
    plannedEnd: { type: Date, required: true },

    actualStart: Date,
    actualEnd: Date,

    distanceKm: { type: Number, default: 0 },
    fuelUsedLiters: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["planned", "in_progress", "completed", "cancelled"],
      default: "planned",
    },

    evaluation: {
      type: String,
      enum: ["perfect", "accomplished", "late"],
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;

        if (ret.driver && !ret.driver.id) ret.driver = ret.driver.toString();
        if (ret.vehicle && !ret.vehicle.id)
          ret.vehicle = ret.vehicle.toString();

        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;

        if (ret.driver && !ret.driver.id) ret.driver = ret.driver.toString();
        if (ret.vehicle && !ret.vehicle.id)
          ret.vehicle = ret.vehicle.toString();

        return ret;
      },
    },
  }
);

export default model("Trip", tripSchema);
