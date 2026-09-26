
import { User } from "@/types/user";

import { Button } from "../ui/button";


interface UserProps{
    employee: User
}

export default function EmployeeProfile(
    {employee}: UserProps){

    return(
        <aside className="flex flex-col gap-2">         
            <h2 className="capitalize text-4xl font-medium">
                {employee.firstname}&nbsp;{employee?.lastname}
            </h2>
            <h6 className="font-medium text-xl italic text-zinc-400">{employee?.email}</h6>
            <Button className="rounded-md">Modifier mon mot de passe</Button>
        </aside>
    )
}