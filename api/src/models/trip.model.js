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

export default model("Trip", tripSchema);
