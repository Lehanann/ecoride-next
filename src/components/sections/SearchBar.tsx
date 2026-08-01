import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function SearchBar(){
    return(
        <div className="flex gap-5 mx-40">
            <Input id="departure" type="text" placeholder="Départ..." className="border border-zinc-500 bg-white"></Input>
            <Input id="end" type="text" placeholder="Arrivée..." className="border border-zinc-500 bg-white"></Input>
            <Input type="date" className="border border-zinc-500 bg-white"></Input>
            <Button variant="primary" className="rounded-full tracking-wider px-4">Valider</Button>
        </div>
    )
}