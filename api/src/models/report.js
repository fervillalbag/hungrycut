const { model, Schema } = require("mongoose");

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
  date: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = model("Report", ReportSchema);
