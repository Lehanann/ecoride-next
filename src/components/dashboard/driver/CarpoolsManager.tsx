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

export default function CarpoolsManager(){

    return (
        <Table>
            <TableHeader>
                <TableRow className="border-gray-700">
                    <TableHead className="text-center">id</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Trajet</TableHead>
                    <TableHead className="text-center">Heure</TableHead>
                    <TableHead className="text-center">Statut</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>

            </TableHeader>
        
        </Table>
    )
}