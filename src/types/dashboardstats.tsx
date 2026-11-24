/**
 * Represents the revenue generated for a specific date.
 *
 * Properties:
 * - date: Revenue date.
 * - amount: Revenue amount generated
 */
export interface RevenueStat{
    date: string;
    amount: number;
}

/**
 * Represents the number of completed carpoolings for a specific date.
 *
 * Properties:
 * - date: Statistic date.
 * - count: Number of carpoolings recorded on that date.
 */
export interface CarpoolingStat{
    date: string;
    count: number;
}

/**
 * Dashboard statistics displayed in the administratar dashboard.
 *
 * Provides aggregated revenue and carpooling metrics along with
 * historical data used for charts and reporting.
 *
 * Properties:
 * - today_revenue: Revenue generated today.
 * - week_revenue: Revenue generated during the current week.
 * - today_carpooling: Number of carpoolings completed today.
 * - week_carpooling: Number of carpoolings completed during the current week.
 * - revenues: Daily revenue statistics.
 * - carpoolings: Daily carpooling statistics.
 */
export interface DashboardStatistics{
    today_revenue: number;
    week_revenue: number;

    today_carpooling: number;
    week_carpooling: number;

    revenues: RevenueStat[];
    carpoolings: CarpoolingStat[];
}