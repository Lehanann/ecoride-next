/**
 * Data required to create a new user account.
 *
 * Contains the registration information provided by the user
 * during the account creation process.
 *
 * Properties:
 * - username: Unique username chosen by the user.
 * - email: User email address.
 * - password: User password.
 * - confirm_password: Password confirmation.
 */
export interface UserCreate{
    username: string;
    email: string;
    password: string;
    confirm_password: string
}

/**
 * Data used to update a user's personal profile information.
 *
 * All properties are optional and may be updated independently.
 *
 * Properties:
 * - firstname: User first name.
 * - lastname: User last name.
 * - phone: User phone number.
 * - address: User address.
 * - birth_date: User date of birth.
 */
export interface UserProfileUpdate{
    firstname?: string;
    lastname?: string;
    phone?: string;
    address?: string;
    birth_date?: string;
}

/**
 * Data used to update user account information.
 *
 * All properties are optional and may be updated independently.
 *
 * Properties:
 * - username: User username.
 * - email: User email address.
 */
export interface UserAccountUpdate{
    username?: string;
    email?: string;
}

/**
 * Data used to update a user's roles.
 *
 * Properties:
 * - roles: List of role names assigned to the user.
 */
export interface UserRoleUpdate{
    roles: string[];
}

/**
 * Represents a user role.
 *
 * Properties:
 * - id: Unique role identifier.
 * - name: Role name.
 */
export interface Role {
    id: number;
    name: string;
}

/**
 * Represents an application user.
 *
 * Contains account information, profile data,
 * assigned roles, and available credits.
 *
 * Properties:
 * - id: Unique user identifier.
 * - username: User's username.
 * - email: User email address.
 * - firstname: User first name.
 * - lastname: User last name.
 * - phone: User phone number.
 * - address: User address.
 * - birth_date: User date of birth.
 * - avatar_url: User avatar image URL.
 * - roles: User roles.
 * - credit: Available credit balance.
 */
export interface User {
    id: number;
    username: string;
    email: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    address?: string;
    birth_date?: string;
    avatar_url?: string;
    roles: Role[];
    credit: number;
}
