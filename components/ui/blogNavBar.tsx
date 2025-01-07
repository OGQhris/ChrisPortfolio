import Link from 'next/link';

interface BlogNavBarProps {
  date: string;
  title: string;
  index: number;
}

export default function BlogNavBar({ date, title, index }: BlogNavBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-0">
        <Link href="/writing" className="text-black/50 bg-zinc-100 py-1 px-3 rounded-lg ">
          <svg className="w-3.5 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 5H1m0 0l4-4m-4 4l4 4"/>
          </svg>
        </Link>
        <div className="flex items-center justify-between w-full">
          <div className="border border-black/50 rounded-lg flex-1 opacity-50">
            <div className="flex justify-center px-3">
              <span style={{ opacity: 1, fontFamily: 'Helvetica Neue', fontSize: '12px' }}>{date}</span>
            </div>
          </div>
          <div className="border border-black/50 rounded-lg flex-1 mx-2 opacity-50" title={title}>
            <div className="flex justify-center px-3">
              <span className="hidden md:block" style={{ opacity: 1, fontFamily: 'Helvetica Neue', fontSize: '12px' }}>Blog Post {index}</span>
              <span className="md:hidden" style={{ opacity: 1, fontFamily: 'Helvetica Neue', fontSize: '12px' }}>{index}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
