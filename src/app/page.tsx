import Hero from "@/components/hero/hero";
import SearchBar from "@/components/sections/SearchBar";
import { Sprout, HandCoins, Handshake, Search, MousePointer2, Car } from 'lucide-react';
import Image from "next/image";
import Mountains from "../../public/mountains.jpg";
import Notice from "../../public/noticesv2.png";

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <section className="container mx-auto my-20">
        <SearchBar/>

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
