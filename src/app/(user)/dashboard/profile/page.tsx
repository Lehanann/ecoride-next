import AccountCard from "@/components/profile/AccountCard";
import AvatarCard from "@/components/profile/AvatarCard";
import PasswordCard from "@/components/profile/PasswordCard";
import ProfileCard from "@/components/profile/ProfileCard";
import RolesCard from "@/components/profile/RolesCard";


export default function ProfilePage(){

    return(
        <section className="grid grid-cols-1 lg:grid-cols-3 space-x-6">
            <div className="flex flex-col space-y-6">
                <AvatarCard />
                <AccountCard />
                                            
            </div>
            <div className="space-y-6">
                <RolesCard /> 
                <PasswordCard/>               
            </div>
            <div>
                <ProfileCard />
            </div>
        </section>
    )
}