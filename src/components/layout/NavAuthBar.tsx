"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import  { useAuth } from '@/hooks/useAuth'
import { logout } from "@/services/auth"
import { toast } from "sonner"

/**
 * Public authentication navigation items.
 *
 * Defines navigation links available to unauthenticated users.
 */
const menuAuth = [
    { id:1, name:'Se connecter', path: '/login' },
    { id:2, name:'S\'inscrire', path: '/register' },
]

/**
 * Authentication navigation component.
 *
 * Displays authentication-related navigation options
 * according to the current user's session state.
 *
 * Features:
 * - Displays login and registration links for guests.
 * - Displays a logout action for authenticated users.
 * - Reacts to authentication state changes.
 *
 * @returns Authentication navigation component.
 */
export default function NavAuthBar() {

  const { user, setUser, isLoading } = useAuth()
  const router = useRouter();

  /**
   * Handles user logout.
   *
   * Terminates the current session, clears the authenticated
   * user from the authentication context, and redirects the
   * user to the home page.
   */
  async function handleLogout(){
    try {
      await logout();
      setUser(null);
      router.push("/");
      router.refresh();
    }
    catch (error: any){
      toast.error(error.message);
    }
  }

  if (isLoading) {
    return null;
  }

  return(
      <nav className="flex items-center shrink-0">
        {
          user ? (
          <ul className=" flex w-full justify-end px-1 gap-5">
            <li>
              <button
                onClick={handleLogout}  
                className="hover:text-[var(--color-accent)] text-lg transition-colors duration-300 cursor-pointer"
              >
                Déconnexion
              </button>
            </li>

          </ul>)
          :
          (<ul className=" flex w-full justify-end px-1 gap-5">
          {
            menuAuth.map((item)=>(
              <li key={item.id}>
                <Link href={item.path} className="hover:text-[var(--color-accent)] text-lg transition-colors duration-300">
                  <span>{item.name}</span>
                </Link>
              </li>
              
            ))
          }
          </ul>)
        }
          
      </nav>
  )

}