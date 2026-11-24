import FormPassword from "../forms/FormPassword";
import{ 
    Card, 
    CardHeader, 
    CardTitle,
    CardContent 
} from "../ui/card";

import { Lock } from 'lucide-react';

/**
 * Password management card.
 *
 * Displays the password update form inside
 * a dashboard card section.
 *
 * @returns Password management card component.
 */
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