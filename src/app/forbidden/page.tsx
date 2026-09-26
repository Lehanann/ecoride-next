import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center h-full gap-6">
            <h1 className="text-6xl font-bold">403</h1>

            <p className="text-muted-foreground text-lg">
                Vous n'avez pas les permissions nécessaires.
            </p>
            <Button asChild className="rounded-md">
                <Link href="/">
                    Retour à l'accueil
                </Link>
            </Button>
        </main>
    )
}