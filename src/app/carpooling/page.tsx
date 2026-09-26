"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { apiFetch } from "@/services/api"
import { SearchData } from "@/types/search"

import { Carpooling } from "@/types/carpooling"
import CarpoolCard from "@/components/carpooling/CarpoolCard"
import SearchBar from "@/components/sections/SearchBar"


import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import CarpoolingLine from "@/components/carpooling/CarpoolingsList"

export default function CarpoolingPage(){

    const [carpoolings, setCarpoolings] = useState<Carpooling[]>([])
    const [allCarpoolings, setAllCarpoolings ] =useState<Carpooling[]>([])
    const [ sortedPrice, setSortedPrice ] = useState("price")

    const searchParams = useSearchParams()

    const departure = searchParams.get("departure")
    const arrival = searchParams.get("arrival")
    const date = searchParams.get("date")

    const [ valueMax, setValueMax ] = useState(0)

    const [ isChecked, setIschecked ] = useState(false)
    

    function handleCarpoolings(allCarpools:Carpooling[]){
        setCarpoolings(allCarpools)
        setAllCarpoolings(allCarpools)
    }

    const sortByPrice = (sortType: string) => {

        if (sortType==="asc"){
             const dataSort = carpoolings.slice().sort(function(a,b){
            return a.price -b.price
            })
            setSortedPrice("price")
            setCarpoolings(dataSort)
        }else{
            
             const dataSort = carpoolings.slice().sort(function(a,b){
            return b.price - a.price
            })
            setSortedPrice("price")
            setCarpoolings(dataSort)
        }
       
        
    }

    useEffect(()=>{
        if(!departure || !arrival ) {
            return;
        }

        async function loadResults(){
            const params = new URLSearchParams({
                departure_location: departure!,
                end_location: arrival!,
            })
            
            if(date){
                params.append("departure_date",date)
            }
            const results: Carpooling[] = await apiFetch(`/carpoolings/search?${params.toString()}`,{method:"GET"})           
            handleCarpoolings(results)
            
        }
        loadResults()
    }, [departure, arrival, date])


    async function handleSearch(searchData: SearchData) {
        
        const params = new URLSearchParams({
            departure_location: searchData.departure_location,
            end_location: searchData.end_location,
        })

        if(searchData.departure_date){
            params.append("departure_date", searchData.departure_date)

        }

        const results: Carpooling[] = await apiFetch(`/carpoolings/search?${params.toString()}`,{method:"GET"})
        handleCarpoolings(results)

        setValueMax(Math.max(...results.map(p=>p.price)))
    }


    const handleChecked = () => {
        setIschecked(!isChecked)
    }

    useEffect(()=>{

        if(isChecked){
            const data = carpoolings.filter((carpooling) => carpooling.car.energy === "electric")
            setCarpoolings(data)
        }
        
        else{
            setCarpoolings(allCarpoolings)
        }
    },[isChecked])

    return(
        <main className="container mx-auto flex flex-col gap-12 my-10">
            <SearchBar onSearch={handleSearch}/>
            <section className="grid grid-cols-12 gap-8">
                <aside className="p-6 col-span-3 space-y-5 text-xl">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="eco"
                            checked={isChecked}
                            onCheckedChange={handleChecked}
                            className="
                                h-4 w-4 rounded-sm
                                border border-zinc-300 bg-zinc-300
                                data-[state=checked]:bg-emerald-600
                                data-[state=checked]:border-emeral-600"                            
                        />
                        <Label htmlFor="eco" className="text-lg">Ecologique</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <RadioGroup
                            onValueChange={(value) => sortByPrice(value)}
                            defaultValue="">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem 
                                    value="asc"
                                    checked={sortedPrice === "price"}
                                    
                                    id="asc"
                                    className="" />
                                <Label htmlFor="asc" className="text-lg">Prix croissant</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                 <RadioGroupItem 
                                    value="dsc" 
                                    id="dsc" />
                                <Label htmlFor="dsc" className="text-lg">Prix décroissant</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price" className="text-lg">Montant</Label>
                        <Slider
                            id="price"
                            min={2}
                            max={100}
                            step={1}
                        >
                        </Slider>
                        montant max = {valueMax}
                    </div>                   

                </aside>
                <article className="col-span-9 space-y-5">
                   <CarpoolingLine carpoolings={carpoolings}/>                  
                </article>                             
            </section>
        </main>        
    )
}