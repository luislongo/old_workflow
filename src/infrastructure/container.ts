import type { IContainer } from "../application/IContainer";
import { GetDashboardData } from "../application/usecases/GetDashboardData";
import { InMemoryDashboardRepository } from "./repositories/InMemoryDashboardRepository";

const dashboardRepository = new InMemoryDashboardRepository();

export const container: IContainer = {
  getDashboardData: new GetDashboardData(dashboardRepository),
};
