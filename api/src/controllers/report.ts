import dayjs from "dayjs";

import { ReportTypeInput } from "types/Report";
import Report from "../models/report";

const createReport = async (input: ReportTypeInput, ctx: any) => {
  const {
    name,
    type,
    image,
    calories,
    carbohydrates,
    proteins,
    isFavorite,
    feeling,
  } = input;

  try {
    const report = new Report({
      name,
      type,
      image,
      calories,
      carbohydrates,
      proteins,
      isFavorite,
      idUser: ctx.user.id,
      feeling,
      date: dayjs(new Date()).format("YYYY-MM-DD"),
      createdAt: new Date(),
    });
    await report.save();

    return {
      message: "Reporte creado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Ha ocurrido un error al crear",
      success: false,
    };
  }
};

const updateReport = async (input: ReportTypeInput, id: string) => {
  try {
    await Report.findOneAndUpdate({ _id: id }, input);

    return {
      message: "Reporte actualizado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Ha ocurrido un error al actualizar",
      success: false,
    };
  }
};

const deleteReport = async (id: string) => {
  try {
    await Report.findOneAndDelete({ _id: id });

    return {
      message: "Reporte eliminado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Hubo un problema al eliminar",
      success: false,
    };
  }
};

const getReports = async (idUser: string, date: string) => {
  try {
    console.log(
      dayjs(Number(date)).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
    );

    if (!date) {
      const reports = await Report.find({ idUser });
      if (!reports) throw new Error("No existen reportes");

      return reports;
    } else {
      const reports = await Report.find({
        idUser,
      }).where({
        date,
      });
      if (!reports) throw new Error("No existen reportes");
      return reports;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getReport = async (id: string) => {
  try {
    const report = await Report.findOne({ _id: id });
    return report;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  createReport,
  updateReport,
  deleteReport,
  getReports,
  getReport,
};
