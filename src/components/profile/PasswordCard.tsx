import FormPassword from "../forms/FormPassword";
import{ 
    Card, 
    CardHeader, 
    CardTitle,
    CardContent 
} from "../ui/card";

import { KeySquare,Lock } from 'lucide-react';

export default function PasswordCard(){

    return(
       <Card className="border rounded-md">
            <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-5"><Lock size={22} />Mot de passe</CardTitle>
            </CardHeader>
            <CardContent>
                <FormPassword/>
            </CardContent>
        </Card>
    )
}