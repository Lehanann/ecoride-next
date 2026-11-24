/**
 * Available vehicle energy types supported by the application.
 * 
 */
export enum Energy {
    electric="electric",
    diesel="diesel",
    hybrid="hybrid",
    essence="essence",
}

/**
 * Represents a vehicle manufacturer.
 *
 * Properties:
 * - id: Unique brand identifier.
 * - name: Brand name.
 */
export interface Brand {
    id: number;
    name: string;
}   

/**
 * Represents a user's vehicle.
 *
 * Contains vehicle identification, registration details,
 * energy type, color, and associated brand information.
 *
 * P*operties:
 * - id: Unique vehicle identifier.
 * - model: Vehicle model name.
 * - registration: Vehicle's registration number.
 * - first_registration_date: Date of the vehicle's first registration.
 * - energy: Vehicle energy type.
 * - color: Vehicle color.
 * - brand: Associated vehicle brand.
 */
export interface Car {
    id: number;
    model: string;
    registration: string;
    first_registration_date: string;
    energy: Energy;
    color: string;
    brand: Brand;
}