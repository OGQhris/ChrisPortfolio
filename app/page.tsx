'use client'
import Image from 'next/image'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const router = useRouter();
  const [animationType, setAnimationType] = useState<'fade' | 'slide'>('fade');

  useEffect(() => {
    const navigationDirection = sessionStorage.getItem('navigationDirection');
    // Only set slide animation when coming from home to writing, not the other way around
    if (navigationDirection === 'home-to-writing') {
      setAnimationType('slide');
      sessionStorage.removeItem('navigationDirection');
    }
  }, []);

  const handleTabChange = (value: string) => {
    if (value === 'writing') {
      sessionStorage.setItem('navigationDirection', 'home-to-writing');
      router.push('/writing');
    }
  };

  const getAnimationClass = (index: number) => {
    if (animationType === 'slide') {
      return `slide-in-left-delay-${index}`;
    }
    return `fade-in-delay-${index}`;
  };

  return (
    <main className="pt-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:flex-1 ">
          <Tabs defaultValue="home" className={`mb-4 ${animationType === 'slide' ? 'slide-in-left' : 'fade-in'}`} onValueChange={handleTabChange} suppressHydrationWarning>
            <TabsList>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="writing">Writing</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-col gap-4 mb-8">
            <h1 className={`text-[36px] md:text-[48px] leading-tight ${animationType === 'slide' ? 'slide-in-left' : 'fade-in'} font-playfair`} suppressHydrationWarning>
              Hi, I&apos;m Chris
            </h1>
            <p className={`text-gray-500/60 text-base leading-relaxed ${getAnimationClass(1)}`} suppressHydrationWarning>
              I am a student at Blue Valley High school learning about new opportunities and exploring new possibilities.
              Get to know more about me through my {" "}
              <Link href="/writing" className="text-black hover:opacity-70 transition-opacity">writing</Link>.
            </p>
            <p className={`text-gray-500/60 text-base leading-relaxed ${getAnimationClass(2)}`} suppressHydrationWarning>
              This website is a place for me to share my upcoming projects; however, for now, the main content is my writings page where I share my thoughts, experiences, and lessons I learned that can&apos;t be shown in a title or a award.
            </p>
          </div>
        </div>
        <div className={`w-full lg:w-[400px] aspect-[3/4] rounded-lg overflow-hidden ${getAnimationClass(3)} self-start image-mask`}
             style={{overflow: 'hidden', position: 'relative'}}
             suppressHydrationWarning>
          <Image
            src="/pictures/meOnTheLake.png"
            alt="Picture of Chris on the lake"
            width={400}
            height={500}
            className="object-cover w-full h-full" 
            priority
            style={{ 
              position: 'absolute', 
              top: '-100px',
              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))'
            }}
          />
        </div>
      </div>
    </main> 
  );
}
