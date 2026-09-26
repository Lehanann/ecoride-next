"use client"

import { useParams } from "next/navigation"

import FormOpinion from "@/components/forms/FormOpinion"

export default function CreateOpinionPage(){

    const { carpoolingId } = useParams()

    if (!carpoolingId) { return null }

    return(
        <main>
            <FormOpinion carpoolingId={Number (carpoolingId)}/>
        </main>
    )
}