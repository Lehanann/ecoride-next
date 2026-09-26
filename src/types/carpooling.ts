import { Car } from '@/types/car'

export enum carpoolingStatus{
    draft="draft",
    published="published",
    finished="finished",
    cancelled="cancelled" 
}

export interface UserSummary{
    id: number;
    username: string;
}

export interface BrandSummary{
    id: number;
    name: string;
}

export interface CarSummary{
    id: number;
    model: string;
    registration: string;
    energy: string;
    brand: BrandSummary;
    user: UserSummary;
}

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

