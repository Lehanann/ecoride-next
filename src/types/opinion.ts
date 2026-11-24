/**
 * Lightweight representation of an opinion author.
 *
 * Used to expose basic user information associated with
 * an opinion without loading the full user profile.
 *
 * Properties:
 * - id: Unique author identifier.
 * - username: Author username.
 */
export interface Author{
    id: number;
    username: string;
}

/**
 * Represents an opinion submitted after a carpooling trip.
 *
 * Contains the review content, rating, validation status,
 * and author information.
 *
 * Properties:
 * - id: Unique opinion identifier.
 * - comment: Review comment provided by the passenger.
 * - note: Rating assigned to the driver.
 * - carpooling_id: Identifier of the related carpooling.
 * - status: Current opinion status.
 * - author: Opinion author information.
 * - validated_at: Opinion validation timestamp.
 */
export interface OpinionType{
    id: number;
    comment: string;
    note: number;
    carpooling_id: number;
    status: string;
    author: Author;
    validated_at: string;
}