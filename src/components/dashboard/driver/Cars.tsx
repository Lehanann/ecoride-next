"use client"

import { useEffect, useState } from "react"

import { ChevronRight, ChevronDown } from 'lucide-react';
import { boolean } from "zod";

const cars = [
    {id: 1, brand: "renault", model: "zoe",registration: "FY-564-PD", date_registration: "2021/04/23", energy:"electric",color:"blue"},
    {id: 2, brand: "dacia", model: "duster",registration: "EA-962-FG", date_registration: "2018/07/19", energy:"diesel",color:"blue night"},
]



export default function Cars(){
    
    const [ openedCarId, setOpenedCarId ] = useState<number | null>(null)
  
    const CouleurCartouche = (energy: string)=>{
         switch (energy){
            case "electric":
                return("bg-sky-200");
            case "essence":
                return("bg-green-200");
            case "diesel":
                return("bg-orange-200");
            default: 
                return("bg-fuchsia-100");
        }
    }
 
    return(
        <aside className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Mes Véhicules</h1>
            {
                cars.map((item)=>{
                    return(
                        <div key={item.id} className={`${CouleurCartouche(item.energy)}`}>
                            <button 
                                onClick={()=>{
                                    setOpenedCarId( openedCarId === item.id ? null : item.id)
                                }} 
                                className={`flex justify-between px-2 py-1  w-full`}>
                                <div>
                                    <span className="capitalize">{item.brand},&nbsp;{item.model}</span>
                                </div>
                                <div className="flex items-center gap-3"> 
                                    <span> {item.registration} </span>
                                    {openedCarId === item.id ?<ChevronDown/>: <ChevronRight/> }
                                </div>
                            </button>

                            <div className={`px-2 py-2 ${openedCarId !== item.id && "hidden" }`}> 
                                <div className="text-sm"> 
                                    <span>Date d'immatriculation&nbsp;:&nbsp;</span>
                                    <span>{item.date_registration}</span>
                                </div>
                                <div className="text-sm"> 
                                    <span>Energie&nbsp;:&nbsp;</span>
                                    <span className="capitalize">{item.energy}</span>
                                </div>
                            
                                <div className="flex justify-between">
                                    <div className="text-sm"> 
                                        <span>Couleur&nbsp;:&nbsp;</span>
                                        <span className="capitalize">{item.color}</span>
                                    </div>
                                    {/*<ButtonDeleteCar car={data}/>*** Non implémenter pour le moment car suppression des carpooling non désiré*/}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </aside>
    )
}