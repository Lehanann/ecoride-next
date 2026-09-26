import { apiFetch } from "./api";
import { OpinionType } from "@/types/opinion";

export async function getPendingOpinions(){

    return apiFetch<OpinionType[]>("/opinions/pending")

}

export async function validateOpinion(id: number){
    return apiFetch(`/opinions/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            status: "approved",
        }),
    });
}

export async function rejectOpinion(id: number){
    return apiFetch(`/opinions/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            status: "rejected",
        }),
    });
}