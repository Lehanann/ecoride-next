/**
 * Converts an energy type value into a human-readable French label.
 *
 * Supported values:
 * - electric → électrique
 * - diesel → diesel
 * - hybrid → hybride
 * - essence → essence
 *
 * Returns an empty string if the value is undefined or unsupported.
 *
 * @param value Energy type value.
 * @returns Localized energy label.
 */
export function formatEnergy(value: string): string{

    if (!value) return ""

    const lowerValue = value.toLowerCase()

    switch (lowerValue){
        case "electric":
            return "électrique"
        case "diesel":
            return "diesel"
        case "hybrid":
            return "hybride"
        case "essence":
            return "essence"
        default:
            return ""
    }
}