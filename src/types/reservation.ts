import { Brand } from "./car";
import { Car } from "./car";

export interface UserSummary{
    id: number;
    username: string;
}

export interface BrandSummary{
    name:string;
}

export interface CarSummary{
    model: string;
    registration: string;
    brand: BrandSummary;
    user: UserSummary;
}

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


export interface Reservation{

   carpooling: CarpoolingSummary;
};