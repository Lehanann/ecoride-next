import Image from "next/image";
import BannerImg from "../../../public/banner.png"

/**
* Home page hero section.
*
* Displays the main promotional banner and highlights
* the EcoRide value proposition on the application's
* home page.
*
* @returns Hero section component.
*/
export default function Hero(){
    return(
        <section className="w-full h-[350px] relative">
            <div className="absolute w-full h-full z-0">
                <Image   
                    src={BannerImg}
                    alt="Banner road in forest"
                    fill
                    loading="eager"
                    className="object-cover"
                />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-10"></div>
            
            <h1 className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 
            text-white text-5xl font-medium leading-relaxed shadow z-20 text-center" >Voyagez plus vert. <br/>Partagez vos trajets.</h1>
      </section>
    )
}