import Opinions from "@/components/dashboard/opinion/Opinions";

/**
* Driver opinions page.
*
* Displays validated opinions received from passengers
* who participated in the driver's carpoolings.
*
* @returns Driver opinions page.
*/
export default function OpinionPage(){
    return(
         <section className="space-y-8">
            <div>
                <h4 className="text-2xl font-medium">Mes Avis</h4>
                <p className="text-muted-foreground">Vous trouverez une liste des avis laissés par les passagers qui ont participé à votre covoiturage.<br/>
                Les avis déposés par les passagers sont validés par Ecoride avant affichage dans votre espace.</p>
            </div>
            <Opinions/>
        </section>
    )
}