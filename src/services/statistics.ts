import { DashboardStatistics } from "@/types/dashboardstats";
import { apiFetch } from "./api";


export async function getDashboardStatistics(){

    return apiFetch<DashboardStatistics>("/statistics", {
        method: "GET",
    })
}