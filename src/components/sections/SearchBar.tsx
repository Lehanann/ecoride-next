"use client"

import { SearchData } from "@/types/search"
import { useState, useEffect} from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"


type SearchBarProps = {
    onSearch: (data: SearchData) => void
}

export default function SearchBar({onSearch}: SearchBarProps){

    

    const [ departureLocation, setDepartureLocation ] = useState("")
    const [ endLocation, setEndLocation ] = useState("")
    const [ departureDate, setDepartureDate ] = useState("")


    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        onSearch({
            departure_location: departureLocation,
            end_location: endLocation,
            departure_date: departureDate
        })

    }

    return(
        <form
            onSubmit={handleSubmit} 
            className="flex gap-5 mx-40"
        >
            <Input
                id="departure" 
                type="text" 
                required
                placeholder="Départ..."
                value={departureLocation}
                onChange={(e)=> setDepartureLocation(e.target.value)}
                className="border border-zinc-500 bg-white rounded-md"
            />
            <Input 
                id="end"
                type="text"
                required
                placeholder="Arrivée..."
                value={endLocation}
                onChange={(e)=> setEndLocation(e.target.value)} 
                className="border border-zinc-500 bg-white rounded-md"
            />
            <Input 
                type="date"
                value={departureDate}
                onChange={(e)=> setDepartureDate(e.target.value)}
                className="border border-zinc-500 bg-white rounded-md"></Input>
            <Button
                type="submit" 
                variant="primary" 
                className="rounded-full tracking-wider px-4"
            >
                Valider
            </Button>
        </form>
    )
}