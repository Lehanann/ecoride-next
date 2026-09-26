import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center gap-6 border flex-1">
            <h1 className="text-7xl font-bold">404</h1>

            <p className="text-muted-foreground text-lg">
                La page demandée est introuvable.
            </p>

            <Button asChild className="rounded-md">
                <Link href="/">
                    Retour à l'accueil
                </Link>
            </Button>
        </main>
    );
}