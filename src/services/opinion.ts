/**
 * Opinion moderation service.
 *
 * Provides helper functions used by employees and administrators
 * to retrieve pending opinions and moderate user reviews.
 */

import { apiFetch } from "./api";
import { OpinionType } from "@/types/opinion";

/**
 * Retrieves all opinions awaiting moderation.
 *
 * Returns the list of opinions currently in a pending state.
 *
 * @returns List of pending opinions.
 */
export async function getPendingOpinions(){
    return apiFetch<OpinionType[]>("/opinions/pending")
}

/**
 * Approves an opinion.
 *
 * Updates the opinion status to "approved" and validates
 * the review.
 *
 * @param id Opinion identifier.
 * @returns API response.
 */
export async function validateOpinion(id: number){
    return apiFetch(`/opinions/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            status: "approved",
        }),
    });
}

/**
 * Rejects an opinion.
 *
 * Updates the opinion status to "rejected" and prevents
 * the review from being published.
 *
 * @param id Opinion identifier.
 * @returns API response.
 */
export async function rejectOpinion(id: number){
    return apiFetch(`/opinions/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            status: "rejected",
        }),
    });
}