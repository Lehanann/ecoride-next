import Participations from "@/components/dashboard/passenger/Participation";

/**
 * User reservations page.
 *
 * Displays the list of carpoolings reserved by the
 * authenticated user and provides access to opinion
 * submission for completed trips.
 *
 * @returns User reservations page.
 */
export default function BookingsPage(){

    return(
        <section className="space-y-8">
            <div>
                <h4 className="text-2xl font-medium">Mes Participations</h4>
                <p className="text-muted-foreground">Listes des trajets auxquels vous avez participé.<br/>
                Vous pouvez ajouter un commentaire sur chaque trajet terminé dont vous avez participé. </p>
            </div>
            <Participations/>
        </section>
        
    )
}

