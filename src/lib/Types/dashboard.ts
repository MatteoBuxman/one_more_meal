import type { Order, OrderWithMeals } from "./orders";

export interface DashboardSnapshot {
  openOrders: OrderWithMeals[];
  closedOrders: OrderWithMeals[];
}
