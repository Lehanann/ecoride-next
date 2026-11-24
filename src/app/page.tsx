"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";

import SearchBar from "@/components/sections/SearchBar";
import Hero from "@/components/hero/hero";
import { SearchData } from "@/types/search";

import Mountains from "../../public/mountains.jpg";

import { Sprout, HandCoins, Handshake, Search, MousePointer2, Car } from 'lucide-react';

/**
* Home page.
*
* Serves as the main entry point of the application and provides:
* - Carpooling search.
* - Presentation of the EcoRide concept.
* - Explanation of the booking process.
* - Presentation of the platform values.
*
* @returns Home page.
*/
export default function HomePage() {

  const router = useRouter()

  /**
  * Handles carpooling search requests.
  *
  * Builds the search query parameters from the user input
  * and redirects the user to the carpooling search results page.
  *
  * @param data Search criteria entered by the user.
  */
  function handleSearch(data: SearchData){
    const params = new URLSearchParams({
      departure: data.departure_location,
      arrival: data.end_location,
    })

    if (data.departure_date){
      params.append("date", data.departure_date)
    }

    router.push(`/carpooling?${params.toString()}`)

  }
 
  return (
    <main className="w-full">
      <Hero />
      <section className="container mx-auto my-20">
        <SearchBar onSearch={handleSearch}/>

        <article className="mt-20 flex gap-15 items-center">
          <div className="w-2/3">
            <h3 className="text-4xl font-medium mb-8">Qu'est-ce qu'Ecoride</h3>
            <p className="text-2xl leading-relaxed">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis aperiam dolorem eius enim recusandae sunt tempora non at, 
              nesciunt magnam, voluptatem dolore eveniet eos ad iure asperiores, tempore ratione facere?</p>  
          </div> 
          <div className="w-1/3">            
            <div className="relative w-full h-[280px]">
              <div className="absolute w-full h-full z-0">
                <Image 
                  src={Mountains}
                  alt=""
                  fill
                  loading="eager"
                  className="object-cover"
                />
              </div>                
              <div className="absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.2)] z-10"></div>
            </div>
          </div>
        </article>

        <article className="mt-20">
          <div className="">
            <h1 className="text-4xl font-medium mb-8">Comment ça marche</h1>
          </div>
          <div className="flex items-center gap-6 text-xl">
            <div className="flex items-center gap-2">
              <Search />
              <span>Cherchez</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-2">
              <MousePointer2 className="rotate-90" />
              <span>Réservez</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-2">
              <Car />
              <span>Voyagez</span>
            </div>
          </div>
        </article>

        <article className="mt-20 ">
          <div className="">
            <h3 className="text-3xl font-medium mb-8">Nos valeurs</h3>
          </div>
          
          <div className="flex text-2xl font-medium items-center gap-10">
            <div className="flex gap-2">
              <Sprout className="text-[var(--color-primary)]"/> 
              <span>Ecologique</span>
            </div>
            <div className="flex items-center gap-2">
              <HandCoins className="text-[var(--color-secondary)]"/> 
              <span>Economique</span>
            </div>
            <div className="flex items-center gap-2">
              <Handshake className="text-[var(--color-accent)]"/> 
              <span>Solidaire</span>
            </div>
          </div>
        </article>
        
      </section>
    </main>
  );
}
