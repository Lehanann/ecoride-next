import FormRegister from '@/components/forms/FormRegister'

/**
 * Registration page.
 *
 * Provides access to the user registration form.
 *
 * @returns Registration page.
 */
export default function RegisterPage(){
    return(
        <main className="w-full max-w-xl">
            <FormRegister/>        
        </main>
    )
}