"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { getDashboardStatistics } from "@/services/statistics";
import { DashboardStatistics } from "@/types/dashboardstats";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { toast } from "sonner"

import { ChartContainer, type ChartConfig  } from "@/components/ui/chart"

/**
 * Administrator dashboard page.
 *
 * Provides administrators with platform statistics,
 * including:
 * - Daily revenue.
 * - Weekly revenue.
 * - Daily carpooling activity.
 * - Weekly carpooling activity.
 * - Revenue trends over the last seven days.
 * - Carpooling trends over the last seven days.
 *
 * Access is restricted to users with the administrator role.
 *
 * @returns Administrator dashboard page.
 */

export default function AdminPage(){
    const { user, isLoading } = useAuth()
    const [ stats, setStats ] = useState<DashboardStatistics | null >(null)

    const router = useRouter()

    const isAdmin = user?.roles.some(role => role.name === "administrator")

    useEffect(()=>{
        if (isLoading) return ;

        if (!user){
            router.replace("/login");
            return;
        }
        if (!isAdmin){
            router.replace("/forbidden")
        }

    },[isLoading, user, isAdmin, router])

    useEffect(()=>{
        if (!user || !isAdmin) return;
        /**
         * Retrieves dashboard statistics for administrators.
         *
         * Loads revenue and carpooling metrics used to populate
         * dashboard cards and charts.
         */
        async function loadStats(){
            try{
                const result = await getDashboardStatistics();
                setStats(result)
            }
           catch{
            toast.error("Impossible de charger les statistiques.")
           }
        }
        loadStats()
    }, [user , isAdmin])

    /**
     * Revenue chart configuration.
     *
     * Defines labels and colors used by the revenue chart.
     */
    const chartConfigRevenue = {
        amount: {
            label: "Revenue",
            color: "#2563eb"
        }
    } satisfies ChartConfig

    /**
     * Carpooling chart configuration.
     *
     * Defines labels and colors used by the carpooling chart.
     */
    const chartConfigCarpooling = {
        count: {
            label: "Covoiturage",
            color: "#16a34a"
        }
    } satisfies ChartConfig

    if(isLoading){ return (<p>Chargement...</p>)}
    
    if (!user || !isAdmin) { return null; }

    return(
        <section>
            <div className="w-6xl mx-auto my-12 grid grid-cols-4 gap-3 ">
                <Card className="rounded-xs">
                    <CardContent className="flex flex-col gap-2">
                        <p className="text-muted-foreground text-xs font-medium">Revenues du jour</p>
                        <p className="text-2xl font-semibold">{stats?.today_revenue} crédits</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xs">
                    <CardContent className="flex flex-col gap-2">
                        <p className="text-muted-foreground text-xs font-medium">Revenues sur 7 jours</p>
                        <p className="text-2xl font-semibold">{stats?.week_revenue} crédits</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xs">
                    <CardContent className="flex flex-col gap-2">
                        <p className="text-muted-foreground text-xs font-medium">Covoiturages du jour </p>
                        <p className="text-2xl font-semibold">{stats?.today_carpooling}</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xs">
                    <CardContent className="flex flex-col gap-2">
                        <p className="text-muted-foreground text-xs font-medium">Covoiturages sur 7 jours</p>
                        <p className="text-2xl font-semibold">{stats?.week_carpooling}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-2 px-15 gap-10">
                <Card className="border rounded-xs mb-5">
                    <CardHeader>
                        <CardTitle><h1 className="text-muted-foreground text-xl">Revenues sur les 7 derniers Jours</h1></CardTitle>                        
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfigRevenue}>
                            <BarChart data={stats?.revenues ?? []}>
                                <Bar dataKey="amount" fill="var(--color-amount)" radius={2} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={true}
                                        
                                        />
                                    <YAxis
                                        dataKey="amount"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                    />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="border rounded-xs mb-5">
                    <CardHeader>
                        <CardTitle><h1 className="text-muted-foreground text-xl">Covoiturage sur les 7 derniers Jours</h1></CardTitle>                        
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfigCarpooling}>
                            <BarChart data={stats?.carpoolings ?? []}>
                                <Bar dataKey="count" fill="var(--color-count)" radius={2} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={true}
                                        
                                        />
                                    <YAxis
                                        dataKey="count"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                    />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}