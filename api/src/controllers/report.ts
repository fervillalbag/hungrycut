import { ReportTypeInput } from "types/Report";
import Report from "../models/report";

const createReport = async (input: ReportTypeInput) => {
  try {
    const report = new Report(input);
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

export default {
  createReport,
  updateReport,
  deleteReport,
};
