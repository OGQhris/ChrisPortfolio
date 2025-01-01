import { Playfair_Display } from 'next/font/google'
import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import { WritingTabs } from '@/components/navigation/WritingTabs'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default async function Writing() {
  const posts = await getSortedPostsData()

  return (
    <main className="pt-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:flex-1">
          <WritingTabs />
          <div className="space-y-12 mb-8">
            <div className="slide-in-right">
              <h1 className={`text-2xl font-bold mb-4 ${playfair.className}`}>My Thoughts</h1>
              <p className="text-gray-500 text-base opacity-100">
                I just write about my experiences and my thoughts throughout these posts. 
                I describe the context and experience and I derive key things that I learned from them.
              </p>
            </div>

            <div className="border-[1px] border-black/[0.15] rounded-xl w-full md:w-[700px] h-[500px] mx-auto">
              <div className="space-y-0 slide-in-right-delay-1 p-6 overflow-y-auto h-full group">
                {posts.map((post, index) => (
                  <Link 
                    key={post.id} 
                    href={`/writing/${post.id}`} 
                    className="block p-2 rounded-lg transition-all duration-200 group-hover:opacity-50 hover:!opacity-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className={`text-lg ${playfair.className}`}>{post.title}</h2>
                        <p className="text-gray-500 text-sm">{post.description}</p>
                      </div>
                      <span className="text-sm text-gray-400">{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}