import FormAccount from "../forms/FormAccount";

import { 
    Card, 
    CardHeader, 
    CardTitle,
    CardContent 
} from "../ui/card";

import { SquareUser } from 'lucide-react';

/**
 * Account settings card.
 *
 * Displays the account information form inside
 * a dashboard card section.
 *
 * @returns Account settings card component.
 */
export default function AccountCard(){

    return(
        <Card className="border rounded-md">
            <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-5"><SquareUser size={22} /> Compte</CardTitle>
            </CardHeader>
            <CardContent>
                <FormAccount/>
            </CardContent>            
        </Card>
    )
}