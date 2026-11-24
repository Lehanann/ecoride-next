/**
 * Lightweight representation of a user.
 *
 * Used in reservation responses to expose only the
 * information required by the user interface.
 *
 * Properties:
 * - id: Unique user identifier.
 * - username: User username.
 */
export interface UserSummary{
    id: number;
    username: string;
}

/**
 * Lightweight representation of a vehicle brand.
 *
 * Properties:
 * - name: Brand name.
 */
export interface BrandSummary{
    name:string;
}

/**
 * Lightweight representation of a vehicle associated
 * with a reserved carpooling.
 * Properties:
 * - model: Vehicle model.
 * - registration: Vehicle registration number.
 * - brand: Vehicle brand information.
 * - user: Driver information.
 */
export interface CarSummary{
    model: string;
    registration: string;
    brand: BrandSummary;
    user: UserSummary;
}

/**
 * Represents a reserved carpooling.
 *
 * Contains the trip information displayed in the
 * user's reservation history.
 *
 * Properties:
 * - id: Unique carpooling identifier.
 * - departure_date: Departure date.
 * - departure_time: Departure time.
 * - departure_location: Departure city or location.
 * - end_location: Destination city or location.
 * - end_date: Arrival date.
 * - end_time: Arrival time.
 * * price: Reservation price in credits.
 * - status: Current carpooling status.
 * - car: Vehicle associated with the trip.
 */
export interface CarpoolingSummary{
    id: number;
    departure_date: string;
    departure_time: string;
    departure_location: string;
    end_location: string;
    end_date: string;
    end_time: string;
    price: number;
    status: string;
    car: CarSummary;
}

/**
 * Represents a user's reservation.
 *
 * Contains the reserved carpooling and indicates
 * whether an opinion has already been submitted
 * for the trip.
 *
 * Properties:
 * - carpooling: Reserved carpooling information.
 * - has_opinion: Indicates whether an opinion
 *   has already been submitted.
 */
export interface Reservation{
   carpooling: CarpoolingSummary;
   has_opinion: boolean;
};