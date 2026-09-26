import { User } from "./user";

export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null)=> void;
    isLoading: boolean;
}