export interface UserCreate{
    username: string;
    email: string;
    password: string;
    confirm_password: string
}

export interface UserProfileUpdate{
    firstname?: string;
    lastname?: string;
    phone?: string;
    address?: string;
    birth_date?: string;
}

export interface UserAccountUpdate{
    username?: string;
    email?: string;
}

export interface UserRoleUpdate{
    roles: string[];
}

export interface Role {
    id: number;
    name: string;
}

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
