"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

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