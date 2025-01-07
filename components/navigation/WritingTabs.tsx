'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from 'next/navigation'

export function WritingTabs() {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    if (value === 'home') {
      // Don't set the navigation direction flag to prevent animation
      router.push('/');
    }
  };

  return (
    <Tabs defaultValue="writing" className="mb-4" onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="writing">Writing</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
