import type { IContainer } from "../application/IContainer";
import { GetDashboardData } from "../application/usecases/GetDashboardData";
import { GetRelatoriosData } from "../application/usecases/GetRelatoriosData";
import { InMemoryDashboardRepository } from "./repositories/InMemoryDashboardRepository";
import { InMemoryRelatoriosRepository } from "./repositories/InMemoryRelatoriosRepository";

const dashboardRepository = new InMemoryDashboardRepository();
const relatoriosRepository = new InMemoryRelatoriosRepository();

export const container: IContainer = {
  getDashboardData: new GetDashboardData(dashboardRepository),
  getRelatoriosData: new GetRelatoriosData(relatoriosRepository),
};
