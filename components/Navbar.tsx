'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <header className="py-8">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <Image 
                        src="/logo.png" 
                        alt="Logo" 
                        className="h-18 w-auto hover:cursor-pointer md:w-[124px] w-[100px]"
                        width={124}
                        height={48}
                        priority
                    />
                </Link>
                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex gap-8 text-lg">
                        <li className="cursor-pointer">
                            <a 
                                href="/pictures/resume.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-base font-helvetica opacity-50 hover:opacity-100 hover:underline transition-all"
                            >
                                Resume
                            </a>
                        </li>
                        <li className="cursor-pointer">
                            <Link href="/contact" className="text-base font-helvetica opacity-50 hover:opacity-100 hover:underline transition-all">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* Mobile Navigation Button */}
                <button 
                    className="md:hidden p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        {isMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
                {/* Mobile Menu Overlay */}
                <div 
                    className={`fixed inset-0 bg-white z-50 md:hidden transition-opacity duration-500 overflow-hidden ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    style={{
                        transition: 'opacity 500ms ease-in-out',
                    }}
                >
                    <div 
                        className={`absolute inset-y-0 right-0 w-full bg-white transform transition-transform duration-500 ease-in-out ${
                            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex flex-col items-end justify-center flex-1 px-8 py-12">
                                <ul className="flex flex-col items-end space-y-10 text-2xl">
                                    <li>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsMenuOpen(false);
                                            }}
                                            className="font-helvetica opacity-100 hover:opacity-100 transition-all block"
                                            aria-label="Close menu"
                                        >
                                            <svg 
                                                className="w-8 h-8" 
                                                fill="none" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="2" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </li>
                                    <li>
                                        <Link 
                                            href="/" 
                                            className="font-helvetica opacity-50 hover:opacity-100 hover:underline transition-all block"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <a 
                                            href="/pictures/resume.pdf" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="font-helvetica opacity-50 hover:opacity-100 hover:underline transition-all block"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Resume
                                        </a>
                                    </li>
                                    <li>
                                        <Link 
                                            href="/contact" 
                                            className="font-helvetica opacity-50 hover:opacity-100 hover:underline transition-all block"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            href="/writing" 
                                            className="font-helvetica opacity-50 hover:opacity-100 hover:underline transition-all block"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Writing
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
