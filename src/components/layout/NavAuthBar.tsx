import Link from "next/link"

const menuAuth = [
    { id:1, name:'Se connecter', path: '/login' },
    { id:2, name:'S\'inscrire', path: '/register' },
  ]

export default function NavAuthBar(){
    return(
        <nav className="flex items-center shrink-0">
            <ul className=" flex w-full justify-end px-1 gap-5">
            {
              menuAuth.map((item)=>(
                <li key={item.id}>
                  <Link href={item.path} className="hover:text-[var(--color-accent)] text-lg transition-colors duration-300">
                    <span>{item.name}</span>
                  </Link>
                </li>
                
              ))
            }
            </ul>
        </nav>
    )

}