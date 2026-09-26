
export function formatStatus(status: string): string{
    
    switch (status){
        case "draft":
            return "Brouillon"
        case "published":
            return "Publié"
        case "finished":
            return "Terminé"
        case "cancelled":
            return "Annulé"
        default:
            return ""
    }
}
