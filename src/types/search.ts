/**
 * Represents the search criteria used to find available carpoolings.
 *
 * Contains the departure location, destination, and an optional
 * departure date used to filter search results.
 *
 * Properties:
 * - departure_location: Departure city or location.
 * - end_location: Destination city or location.
 * - departure_date: Optional departure date.
 */
export interface SearchData{
    departure_location: string;
    end_location: string;
    departure_date?: string;
}