import type { GetDashboardData } from "./usecases/GetDashboardData";
import type { GetRelatoriosData } from "./usecases/GetRelatoriosData";

export interface IContainer {
  getDashboardData: GetDashboardData;
  getRelatoriosData: GetRelatoriosData;
}
