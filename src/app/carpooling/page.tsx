import CarpoolCard from "@/components/carpooling/CarpoolCard"
import SearchBar from "@/components/sections/SearchBar"


export default function CarpoolingPage(){
    return(
        <main className="container mx-auto my-20">
            <SearchBar/>
            <div className="mt-20 flex flex-col gap-10">
                <article className="flex justify-center">
                    <CarpoolCard/>
                </article>
                <article className="flex justify-center">
                    <CarpoolCard/>
                </article>
            </div>
            
            
        </main>
        
    )
}