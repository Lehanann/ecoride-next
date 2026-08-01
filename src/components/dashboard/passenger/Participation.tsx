import CarpoolTable from "../elements/CarpoolTable";
import Link from "next/link";

export default function Participations(){

    return (
        <article className="flex flex-col">
            <CarpoolTable />
            <div className="flex justify-center items-center my-3">
                <Link href="/dashboard/bookings" className="underline font-semibold text-sky-700">Voir l'historique de mes trajets</Link>
            </div>
        </article>
    )
}