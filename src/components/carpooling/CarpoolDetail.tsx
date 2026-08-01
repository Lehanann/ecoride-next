import { ArrowRight, Car, EvCharger, MapPin, Flag, UserRound, PawPrint, CigaretteOff, Armchair } from "lucide-react"
import { Button } from "../ui/button"

export default function CarpoolDetail(){
    return(
        <section className="w-full max-w-6xl mx-auto flex gap-16">
            <article className="w-2/3 flex flex-col gap-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-6xl font-medium">
                        <span>Grandris</span>
                        <ArrowRight size={56}/> 
                        <span>Gleizé</span> 
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col justify-between">
                        <p>09:00 am</p>
                        <p>09:45 am</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <MapPin/>
                        <hr className="h-15 border-l-2 w-0 ml-3 my-2 border-gray-500 border-dashed"></hr>
                        <Flag/>                 
                    </div>
                    
                    <div className="flex flex-col justify-between gap-2">
                        <p>20 rue des Glycérines, 69870 Grandris</p>  
                        <p>618 avenue Garibaldi, 69400 Gleizé</p>
                    </div>
                </div>
                <div className="mt-10 flex flex-col gap-3">
                    <h6>Options du trajet</h6>
                    <p className="flex gap-1"><CigaretteOff/>: Voyage non fumeur.</p>
                    <p className="flex gap-1"><PawPrint/>: Votre animal de compagnie est le bien venu.</p>
                </div>
            </article>
            <aside className="flex flex-col w-1/3 gap-10 border-l pl-10">
                <div className="mx-auto">
                    <span className="text-7xl">5€</span>
                </div>
                <div className="mx-auto flex items-center gap-1">
                    <Armchair size={48} />
                    <span className="text-5xl font-medium">2</span>
                </div>
                <div className="mx-auto">
                    <div className="flex items-center gap-1 text-gray-500">
                        <UserRound size={40}/>
                        <p className="text-5xl text-gray-600">&nbsp;&nbsp;jdoe</p>
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <Car size={32} className="text-amber-700"/>
                            <p className="text-">
                                : Renault, Zoe
                            </p>
                        </div>
                        <div className="flex items-center gap-1">
                            <EvCharger size={32} className="text-sky-600"/>
                            <div className="text-l">
                                : Electrique
                            </div>
                        </div>
                    </div>
                </div>
                <Button className="bg-[var(--color-primary)] w-full text-lg font-medium py-4">Réservation</Button>
            </aside>
        </section>
    )
}