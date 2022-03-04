"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReportSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = (0, mongoose_1.model)("Report", ReportSchema);
