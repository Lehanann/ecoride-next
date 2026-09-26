export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("fr-FR").replaceAll("/", "-");
}

export function formatTime(time: string): string {
  return time.slice(0, 5);
}