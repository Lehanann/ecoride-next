import { Badge } from "@/components/ui/badge";
import { 
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
 } from "@/components/ui/table";
import { ArrowRight } from "lucide-react"

export default function CarpoolTable(){

    return(
        <Table>
            <TableHeader>
                <TableRow className="border-gray-700">
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Trajet</TableHead>
                    <TableHead className="text-center">Heure départ</TableHead>
                    <TableHead className="text-center">statut</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="h-14">
                    <TableCell className="text-center">12/06/2026</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center">Grandris <ArrowRight /> Gleize </TableCell>
                    <TableCell className="text-center">09:30 - 10h15</TableCell>
                    <TableCell className="text-center"><Badge className="bg-sky-100 text-sky-700">En cours</Badge></TableCell>
                </TableRow>
                <TableRow className="h-14">
                    <TableCell className="text-center">11/06/2026</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center">Grandris <ArrowRight /> Gleize </TableCell>
                    <TableCell className="text-center">09:30 - 10:15</TableCell>
                    <TableCell className="text-center"><Badge className="bg-green-100 text-green-700">Terminé</Badge> </TableCell>
                </TableRow>
                <TableRow className="h-14">
                    <TableCell className="text-center">09/06/2026</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center">Grandris <ArrowRight /> Gleize </TableCell>
                    <TableCell className="text-center">09:30 - 10:15</TableCell>
                    <TableCell className="text-center">terminé</TableCell>
                </TableRow>
                <TableRow className="h-14">
                    <TableCell className="text-center">09/06/2026</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center">Grandris <ArrowRight /> Gleize </TableCell>
                    <TableCell className="text-center">09:30 - 10:15</TableCell>
                    <TableCell className="text-center">terminé</TableCell>
                </TableRow>
                <TableRow className="h-14">
                    <TableCell className="text-center">09/06/2026</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center">Grandris <ArrowRight /> Gleize </TableCell>
                    <TableCell className="text-center">09:30 - 10:15</TableCell>
                    <TableCell className="text-center">terminé</TableCell>
                </TableRow>
                <TableRow className="h-14">
                    <TableCell className="text-center">09/06/2026</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center">Grandris <ArrowRight /> Gleize </TableCell>
                    <TableCell className="text-center">09:30 - 10:15</TableCell>
                    <TableCell className="text-center">terminé</TableCell>
                </TableRow>
                <TableRow className="h-14">
                    <TableCell className="text-center">09/06/2026</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center">Grandris <ArrowRight /> Gleize </TableCell>
                    <TableCell className="text-center">09:30 - 10:15</TableCell>
                    <TableCell className="text-center">terminé</TableCell>
                </TableRow>
                <TableRow className="h-14">
                    <TableCell className="text-center">09/06/2026</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center">Grandris <ArrowRight /> Gleize </TableCell>
                    <TableCell className="text-center">09:30 - 10:15</TableCell>
                    <TableCell className="text-center">terminé</TableCell>
                </TableRow>
                             
            </TableBody>

        </Table>
    )
}