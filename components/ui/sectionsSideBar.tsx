'use client'

import { Playfair_Display } from "next/font/google";
import { useEffect } from 'react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface SectionsSideBarProps {
  headings: Heading[];
}

export default function SectionsSideBar({ headings }: SectionsSideBarProps) {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full lg:w-64">
      <div className="sticky top-6">
        <h3 className={`text-base font-semibold mb-4 text-black ${playfair.className}`}>Sections</h3>
        <nav className="space-y-3">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              style={{ 
                fontFamily: 'Helvetica Neue', 
                fontSize: '14px', 
                color: 'black',
                opacity: 0.35,
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'block',
                transition: 'opacity 0.2s',
                paddingLeft: `${(heading.level - 1) * 0.75}rem`, // Indent based on heading level
              }}
              className="hover:opacity-100"
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
