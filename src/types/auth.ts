import { User } from "./user";
/**
 * Authentication context contract.
 *
 * Provides the authenticated user information and authentication state
 * across the application through the AuthContext provider.
 *
 * Properties:
 * - user: Currently authenticated user or null if not authenticated.
 * - setUser: Updates the authenticated user state.
 * - isLoading: Indicates whether authentication data is being loaded.
 */
export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
}