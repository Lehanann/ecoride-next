import EmployeeProfile from "@/components/moderation/EmployeeProfile";
import OpinionCard from "@/components/sections/OpinionCard";


export default function ModerationPage(){

    return(
        <section className="grid grid-cols-[1fr_3fr]">
           
           <EmployeeProfile />
           <div className="flex flex-wrap gap-5 px-6">
                <OpinionCard />
           </div>
           
        </section>
    )
}