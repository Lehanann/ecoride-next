import FormLogin from '@/components/forms/FormLogin'

/**
 * Login page.
 *
 * Provides access to the user authentication form.
 *
 * @returns Login page.
 */
export default function LoginPage(){
    return(
       <main className="w-full max-w-xl">
            <FormLogin/>
       </main>
    )
}