'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="pt-2 pb-4 mt-auto">
      <div className="flex justify-center gap-6">
        <Link 
          href="https://www.linkedin.com/in/chris-marvel" 
          target="_blank" 
          className="text-black opacity-50 hover:opacity-100 hover:underline transition-colors"
        >
          LinkedIn
        </Link>
        <Link 
          href="https://github.com/OGQhris" 
          target="_blank" 
          className="text-black opacity-50 hover:opacity-100 hover:underline transition-colors"
        >
          GitHub
        </Link>
        <Link 
          href="https://twitter.com/OGQhris" 
          target="_blank" 
          className="text-black opacity-50 hover:opacity-100 hover:underline transition-colors"
        >
          Twitter
        </Link>
      </div>
    </footer>
  )
}
