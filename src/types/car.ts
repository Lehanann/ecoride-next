export enum Energy {
    electric="electric",
    diesel="diesel",
    hybrid="hybrid",
    essence="essence",
}

export interface Brand {
    id: number;
    name: string;
}   

export interface Car {
    id: number;
    model: string;
    registration: string;
    first_registration_date: string;
    energy: Energy;
    color: string;
    brand: Brand;
}