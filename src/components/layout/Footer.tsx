/**
 * Application footer component.
 *
 * Displays general site information, contact details,
 * legal information, and copyright notices.
 *
 * @returns Application footer component.
 */
export default function Footer(){
    return(
        <footer className="bg-gray-900 py-10 text-white mt-auto">
            <div className="container mx-auto py-10 flex flex-col gap-4">
                <p className="text-lg font-medium">Ecoride</p>
                <p className="">
                    Contact: contact@ecoride.fr
                </p>
                <p className="text-sm underline cursor-pointer">
                    Mentions légales
                </p>
                <p className="text-xs text-gray-400 mt-4">
                    © 2026 Lehanann. Tous droits réservés.
                </p>
            </div>
        </footer>
    )
}