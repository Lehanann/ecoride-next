import { Button } from "../ui/button";


export default function EmployeeProfile(){

    return(
        <aside className="">
            <p>John Smith</p>
            <p>jsmith@ecoride.fr</p>
            <p>Modérateur</p>
            <Button>Modifier mon mot de passe</Button>
        </aside>
    )
}