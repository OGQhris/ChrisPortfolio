'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from 'next/navigation'

export function WritingTabs() {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    if (value === 'home') {
      // Set a flag in sessionStorage to indicate navigation direction
      sessionStorage.setItem('navigationDirection', 'writing-to-home');
      router.push('/');
    }
  };

  return (
    <Tabs defaultValue="writing" className="mb-4 slide-in-right" onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="writing">Writing</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
