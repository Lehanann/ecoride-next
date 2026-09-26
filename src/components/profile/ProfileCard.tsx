import FormProfile from '@/components/forms/FormProfile'

import { 
    Card, 
    CardHeader, 
    CardTitle,
    CardContent 
} from "../ui/card";

import { ClipboardList } from 'lucide-react';

export default function ProfileCard(){

    return(
        <Card className="border rounded-md ">
            <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-5"><ClipboardList size={22}/>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
                <FormProfile/>
            </CardContent>
            
        </Card>
    )
}