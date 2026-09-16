import type { GetDashboardData } from "./usecases/GetDashboardData";

export interface IContainer {
  getDashboardData: GetDashboardData;
}
