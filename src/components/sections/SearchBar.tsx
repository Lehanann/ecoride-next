"use client"

import { SearchData } from "@/types/search"
import { useState} from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

/**
 * Properties accepted by the SearchBar component.
 *
 * Properties:
 * - onSearch: Callback receiving the search criteria submitted by the user.
 */
type SearchBarProps = {
    onSearch: (data: SearchData) => void
}

/**
 * Search form used to find available carpoolings.
 *
 * Allows users to search for trips by specifying:
 * - A departure location.
 * - A destination.
 * - An optional departure date.
 *
 * When submitted, the component forwards the search criteria
 * to the parent component through the onSearch callback.
 *
 * @param props Component properties.
 * @param props.onSearch Callback executed when a search is submitted.
 * @returns Search form component.
 */
export default function SearchBar({onSearch}: SearchBarProps){

    const [ departureLocation, setDepartureLocation ] = useState("")
    const [ endLocation, setEndLocation ] = useState("")
    const [ departureDate, setDepartureDate ] = useState("")

    /**
    * Handles search form submission.
    *
    * Prevents the default form behavior and forwards the
    * current search criteria to the parent component.
    *
    * @param e Form submission event.
    */
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
                className="rounded-md tracking-wider px-4"
            >
                Valider
            </Button>
        </form>
    )
}