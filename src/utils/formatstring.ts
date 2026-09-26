

export function capitalize(value: string): string {

    if (!value) return ""

    const lowerValue = value.toLowerCase()

    return lowerValue.charAt(0).toUpperCase()+lowerValue.slice(1)
}