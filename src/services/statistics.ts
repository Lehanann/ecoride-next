/**
 * Dashboard statistics service.
 *
 * Provides helper functions used to retrieve administrative
 * statistics and reporting data displayed in the dashboard.
 */
import { DashboardStatistics } from "@/types/dashboardstats";
import { apiFetch } from "./api";

/**
 * Retrieves dashboard statistics.
 *
 * Returns aggregated revenue and carpooling metrics used
 * to populate dashboard cards, charts, and reports.
 *
 * @returns Dashboard statistics.
 */
export async function getDashboardStatistics(){
    return apiFetch<DashboardStatistics>("/statistics", {
        method: "GET",
    })
}