"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const report_1 = __importDefault(require("../models/report"));
const createReport = (input, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, image, calories, carbohydrates, proteins, isFavorite, feeling, } = input;
    try {
        const report = new report_1.default({
            name,
            type,
            image,
            calories,
            carbohydrates,
            proteins,
            isFavorite,
            idUser: ctx.user.id,
            feeling,
            date: (0, dayjs_1.default)().format("YYYY-MM-DD"),
            createdAt: new Date(),
        });
        yield report.save();
        return {
            message: "Reporte creado correctamente",
            success: true,
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: "Ha ocurrido un error al crear",
            success: false,
        };
    }
});
const updateReport = (input, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield report_1.default.findOneAndUpdate({ _id: id }, input);
        return {
            message: "Reporte actualizado correctamente",
            success: true,
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: "Ha ocurrido un error al actualizar",
            success: false,
        };
    }
});
const deleteReport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield report_1.default.findOneAndDelete({ _id: id });
        return {
            message: "Reporte eliminado correctamente",
            success: true,
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: "Hubo un problema al eliminar",
            success: false,
        };
    }
});
const getReports = (idUser, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, dayjs_1.default)(Number(date)).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"));
        if (!date) {
            const reports = yield report_1.default.find({ idUser });
            if (!reports)
                throw new Error("No existen reportes");
            return reports;
        }
        else {
            const reports = yield report_1.default.find({
                idUser,
            }).where({
                date,
            });
            if (!reports)
                throw new Error("No existen reportes");
            return reports;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
const getReport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield report_1.default.findOne({ _id: id });
        return report;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = {
    createReport,
    updateReport,
    deleteReport,
    getReports,
    getReport,
};
