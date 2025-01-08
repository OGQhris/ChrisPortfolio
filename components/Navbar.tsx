import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <header className="py-8 ">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <Image 
                        src="/logo.png" 
                        alt="Logo" 
                        className="h-18 w-auto hover:cursor-pointer"
                        width={124}
                        height={48}
                        priority
                    />
                </Link>
                <nav>
                    <ul className="flex gap-8 text-lg">
                        <li className="cursor-pointer">
                            <a 
                                href="/assets/resume.pdf" 
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
            </div>
        </header>
    )
}

export default Navbar
