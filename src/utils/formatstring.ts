/**
 * Capitalizes the first letter of a string.
 *
 * The value is first converted to lowercase to ensure
 * consistent formatting before capitalization.
 *
 * Examples:
 * - "PARIS" → "Paris"
 * - "lYoN" → "Lyon"
 *
 * Returns an empty string if the value is undefined or empty.
 *
 * @param value String to capitalize.
 * @returns Capitalized string.
 */
export function capitalize(value: string): string {

    if (!value) return ""

    const lowerValue = value.toLowerCase()

    return lowerValue.charAt(0).toUpperCase()+lowerValue.slice(1)
}