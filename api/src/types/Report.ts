export type ReportType = {
  id: string;
  name: string;
  type: string;
  image: string;
  proteins: number;
  carbohydrates: number;
  calories: number;
  isFavorite: number;
  feeling: string;
  idUser: string;
};

export type ReportTypeInput = {
  name: string;
  type: string;
  image: string;
  proteins: number;
  carbohydrates: number;
  calories: number;
  isFavorite: number;
  feeling: string;
};
