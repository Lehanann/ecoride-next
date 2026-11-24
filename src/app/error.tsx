"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
* Error page.
*
* Displays a fallback user interface when an unexpected
* error occurs during page rendering.
*
* Allows users to retry the operation or return
* to the home page.
*
* @param props Error page properties.
* @param props.error Captured error instance.
* @param props.reset Function used to retry rendering.
* @returns Error page.
*/
export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {

    console.error(error);

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-6">
            <h1 className="text-6xl font-bold">
                Oups...
            </h1>

            <p className="text-muted-foreground text-lg text-center max-w-md">
                Une erreur inattendue est survenue lors du chargement de cette page.
            </p>

            <div className="flex gap-3">
                <Button
                    onClick={() => reset()}
                    className="rounded-md"
                >
                    Réessayer
                </Button>

                <Button
                    asChild
                    variant="outline"
                    className="rounded-md"
                >
                    <Link href="/">
                        Retour à l'accueil
                    </Link>
                </Button>
            </div>
        </main>
    );
}