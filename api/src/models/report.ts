import { model, Schema } from "mongoose";

const ReportSchema = new Schema({
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
    type: Number,
    required: true,
  },
  feeling: {
    type: Number,
    required: true,
  },
  idUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Report", ReportSchema);
