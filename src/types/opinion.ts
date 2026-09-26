
export interface Author{
    id: number;
    username: string;
}

export interface OpinionType{
    id: number;
    comment: string;
    note: number;
    carpooling_id: number;
    status: string;
    author: Author;
    validated_at: string;
}