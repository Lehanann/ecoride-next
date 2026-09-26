import FormRoles from "../forms/FormRoles";
import { 
    Card, 
    CardHeader, 
    CardTitle,
    CardContent 
} from "../ui/card";

import { ArrowLeftRight } from 'lucide-react';

export default function RolesCard(){

    return(
        <Card className="border rounded-md">
            <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-5"><ArrowLeftRight size={22}/> Roles</CardTitle>
            </CardHeader>
            <CardContent>
                <FormRoles />
            </CardContent>
        </Card>
    )
}