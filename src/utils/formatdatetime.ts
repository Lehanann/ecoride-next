/**
 * Formats an ISO date string into a French date format.
 *
 * The resulting date uses the "fr-FR" locale and replaces
 * forward slashes with hyphens for display consistency.
 *
 * @param date ISO date string.
 * @returns Formatted date string.
 */
export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("fr-FR").replaceAll("/", "-");
}

/**
 * Extracts hours and minutes from a time string.
 *
 * Example:
 * - "14:30:00" → "14:30"
 *
 * @param time Time string.
 * @returns Formatted time string containing hours and minutes.
 */

export function formatTime(time: string): string {
  return time.slice(0, 5);
}