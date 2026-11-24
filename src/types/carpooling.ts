/**
 * Available carpooling statuses.
 *
 * Represents the lifecycle of a carpooling trip from creation
 * to completion or cancellation.
 */
export enum carpoolingStatus{
    draft="draft",
    published="published",
    finished="finished",
    cancelled="cancelled" 
}

/**
 * Lightweight representation of a driver.
 *
 * Used in carpooling responses to provide essential driver
 * information without exposing the full user profile.
 *
 * Properties:
 * - id: Unique driver identifier.
 * - username: Driver username.
 * - avatar_url: Driver avatar image URL.
 * - count: Total number of received reviews.
 * - average_ratings: Driver average rating.
 */
export interface UserSummary{
    id: number;
    username: string;
    avatar_url: string;
    count: number;
    average_ratings: number;
}

/**
 * Lightweight representation of a vehicle brand.
 *
 * Properties:
 * - id: Unique bra*d identifier.
 * - name: Brand name
 */
export interface BrandSummary{
    id: number;
    name: string;
}

/**
 * Lightweight representation of a vehicle associated with a carpooling.
 *
 * Contains only the information required to display trip search
 * results add trip details.
 *
 * Properties:
 * - id: Unique vehicle identifier.
 * - model: Vehicle model.
 * - registration: Vehicle registration number.
 * - energy: Vehicle energy type.
 * - brand: Vehicle brand information.
 * - user: Associated driver information.
 */
export interface CarSummary{
    id: number;
    model: string;
    registration: string;
    energy: string;
    brand: BrandSummary;
    user: UserSummary;
}

/**
** Represents a carpooling trip available for reservation.
 *
 * Contains route information, trip schedule, pricing,
 * seat availability, a*d vehicle details.
 *
 * Properties:
 * - id: Unique carpooling identifier.
 * - departure_date: Departure date.
 * - departure_time: Departure time.
 * - departure_location: Departure city or location.
 * - end_date: Arrival date.
 * - end_time: Arrival time.
 * - end_location: Destination city or location.
 * - place_number: Number of remaining available seats.
 * - price: Trip price in credits.
 * - status: Current carpooling status.
 * - car: Vehicle used for the trip.
 */
export interface Carpooling{
    id: number;
    departure_date: string;
    departure_time: string;
    departure_location: string;
    end_date: string;
    end_time: string;
    end_location: string;
    place_number: number;
    price: number;
    status: carpoolingStatus;
    car: CarSummary;
}

/**
 * Groups carpoolings by departure date.
 *
 * Used to organize and display carpoolings in date-based sections.
 *
 * Properties:
 * - date: Grouping date.
 * - carpoolings: Carpoolings associated with the date.
 */
export interface GroupedCarpoolings{
    date: string;
    carpoolings: Carpooling[];
}