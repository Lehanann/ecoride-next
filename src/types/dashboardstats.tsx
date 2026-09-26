
export interface RevenueStat{
    date: string;
    amount: number;
}

export interface CarpoolingStat{
    date: string;
    count: NumberConstructor;
}

export interface DashboardStatistics{
    today_revenue: number;
    week_revenue: number;

    today_carpooling: number;
    week_carpooling: number,

    revenues: RevenueStat[];
    carpoolings: CarpoolingStat[];
}