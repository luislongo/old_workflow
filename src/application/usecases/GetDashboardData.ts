import type { IDashboardRepository } from "../../domain/repositories/IDashboardRepository";
import type { DashboardData } from "../../domain/Dashboard";

export class GetDashboardData {
  constructor(private readonly repository: IDashboardRepository) {}

  execute(): Promise<DashboardData> {
    return this.repository.getDashboardData();
  }
}
