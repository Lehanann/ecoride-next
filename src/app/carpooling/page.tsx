"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { apiFetch } from "@/services/api"
import { SearchData } from "@/types/search"
import { Carpooling } from "@/types/carpooling"
import SearchBar from "@/components/sections/SearchBar"
import CarpoolingLine from "@/components/carpooling/CarpoolingsList"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Star } from "lucide-react"

/**
* Carpooling search page.
*
* Allows users to:
* - Search available carpoolings.
* - Filter search results.
* - Browse matching trips.
*
* Available filters include:
* - Electric vehicles only.
* - Maximum price.
* - Minimum driver rating.
*
* Search criteria can be provided from the home page
* or directly through the search form.
*
* @returns Carpooling search page.
*/
export default function CarpoolingPage(){

    const [carpoolings, setCarpoolings] = useState<Carpooling[]>([])
    const [allCarpoolings, setAllCarpoolings ] =useState<Carpooling[]>([])

    const searchParams = useSearchParams()

    const departure = searchParams.get("departure")
    const arrival = searchParams.get("arrival")
    const date = searchParams.get("date")


    const [ isChecked, setIschecked ] = useState(false)
    const [selectedPrice, setSelectedPrice] = useState([10])
    const [sliderMaxPrice, setSliderMaxPrice] = useState(10)
    const [ minRating, setMinRating ] = useState([0])

    /**
    * Updates the search results displayed to the user.
    *
    * Stores both the displayed results and the original
    * result set used by client-side filters.
    *
    * @param allCarpools Retrieved carpooling results.
    */
    function handleCarpoolings(allCarpools:Carpooling[]){
        setCarpoolings(allCarpools)
        setAllCarpoolings(allCarpools)
        const highestPrice = allCarpools.length > 0 ? Math.max(...allCarpools.map( c => c.price)) : 10
        setSliderMaxPrice(highestPrice)
        setSelectedPrice([highestPrice])
    }

    useEffect(()=>{
        if(!departure || !arrival ) {
            return;
        }
        /**
        * Retrieves carpoolings matching search parameters
        * provided through the URL query
        */
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

    /**
     * Handles carpooling search requests.
     *
     * Sends the search criteria to the backend API and
     * updates the displayed results.
     *
     * @param searchData Search criteria entered by the user.
     */
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
       
    }
   
    /**
    * Toggles the ecological vehicle filter.
    */
    const handleChecked = () => {
        setIschecked(prev => !prev )
    }
    
    /**
    * Updates the maximum accepted price filter.
    *
    * @param value Selected price value.
    */
    /*function handleChangePrice(value: number[]){
        setMaxPrice(value)  
    }*/

    /**
    * Updates the minimum driver rating filter.
    *
    * @param value Selected rating value.
    */
    function handleChangeRating(value: number[]){
        setMinRating(value)
    }

    /**
    * Applies client-side filters to search results.
    *
    * Filters can include:
    * - Electric vehicles only.
    * - Maximum price.
    * - Minimum driver rating.
    */
    function applyFilters(){
        let data = [...allCarpoolings]
        if(isChecked){
            data = data.filter( (carpooling) => carpooling.car.energy === "electric")
        }
        data = data.filter((carpooling)=>carpooling.price <= selectedPrice[0])
        data = data.filter((carpooling)=> carpooling.car.user.average_ratings >= minRating[0])
        setCarpoolings(data)
     }

    useEffect(()=>{
        applyFilters()
    },[isChecked, selectedPrice, minRating, allCarpoolings])
    
    return(
        <main className="container mx-auto flex flex-col gap-12 my-10">
            <SearchBar onSearch={handleSearch}/>
             <div className="mx-20 grid grid-cols-3 p-5 gap-10">
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
                        <div className=" flex flex-col gap-2">
                            <Label htmlFor="price" className="text-lg">Prix maximum : {selectedPrice[0]} crédits</Label>
                            <Slider 
                                id="price"
                                defaultValue={[5]}
                                max={sliderMaxPrice}
                                step={1}
                                value={selectedPrice}
                                onValueChange={setSelectedPrice}
                            />
                        </div>
                        <div className=" flex flex-col gap-2">
                            <Label htmlFor="rating" className="text-lg">Note minimal : {minRating[0]} 
                                <Star 
                                    size={18} 
                                    fill="currentColor" 
                                    className="text-amber-400"
                                />
                            </Label>
                            <Slider 
                                id="rating"
                                defaultValue={[0]}
                                max={5}
                                step={1}
                                value={minRating}
                                onValueChange={(value) => handleChangeRating(value)}
                            />
                        </div>
                    </div>
            {
                carpoolings.length === 0
                && (<p className="text-center text-muted-foreground text-2xl italic"> Aucun resultats.</p>)
                
            }            
            <section className="px-20">                
                <article className="space-y-5">
                   <CarpoolingLine carpoolings={carpoolings}/>                  
                </article>                             
            </section>
        </main>        
    )
}