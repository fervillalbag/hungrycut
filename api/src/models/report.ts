import { model, Schema } from "mongoose";

const ReportSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    proteins: {
      type: Number,
      required: true,
      default: 0,
    },
    carbohydrates: {
      type: Number,
      required: true,
      default: 0,
    },
    calories: {
      type: Number,
      required: true,
      default: 0,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
    feeling: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Report", ReportSchema);
