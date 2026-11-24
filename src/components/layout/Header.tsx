import NavBar from "./NavBar"
import NavAuthBar from "./NavAuthBar"

/**
 * Application header component.
 *
 * Displays the application name, main navigation menu,
 * and authentication navigation controls.
 *
 * @returns Application header component.
 */
export default function Header(){
    return(
        <header className="bg-[var(--color-primary)] h-24 sticky top-0 text-[var(--color-background)] flex items-center px-8 font-medium w-full z-50">
            <div className="text-3xl flex items-center shrink-0">
                <h1>Ecoride</h1>
            </div>
            <NavBar/>
            <NavAuthBar/>
        </header>
    )
}