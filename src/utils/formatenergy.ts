
export function formatEnergy(value: string): string{

    if (!value) return ""

    const lowerValue = value.toLowerCase()

    switch (value){
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