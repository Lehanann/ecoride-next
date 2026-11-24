/**
 * Converts a carpooling status value into a human-readable French label.
 *
 * Supported values:
 * - draft → Brouillon
 * - published → Publié
 * - finished → Terminé
 * - cancelled → Annulé
 *
 * Returns an empty string if the status is undefined or unsupported.
 *
 * @param status Carpooling status value.
 * @returns Localized status label.
 */
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
