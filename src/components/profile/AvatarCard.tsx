import FormAvatar from "../forms/FormAvatar";
import{ 
    Card, 
    CardHeader, 
    CardTitle,
    CardContent 
} from "../ui/card";

import { Image } from 'lucide-react';

/**
 * Avatar management card.
 *
 * Displays the avatar update form inside
 * a dashboard card section.
 *
 * @returns Avatar management card component.
 */
export default function AvatarCard(){

    return(
        <Card className="border rounded-md">
            <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-5"><Image size={22}/>Avatar</CardTitle>
            </CardHeader>
            <CardContent>
                <FormAvatar />
            </CardContent>
        </Card>
    )
}