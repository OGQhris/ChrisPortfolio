import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import BlogNavBar from "@/components/ui/blogNavBar";
import SectionsSideBar from "@/components/ui/sectionsSideBar";
import { getPostData, getAllPostIds, getSortedPostsData } from "@/lib/posts";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);
  const allPosts = await getSortedPostsData();
  
  // Sort posts by date in ascending order (oldest first)
  const sortedPosts = [...allPosts].sort((a, b) => {
    const [aMonth, aDay, aYear] = a.date.replace(/"/g, '').split('/').map(Number);
    const [bMonth, bDay, bYear] = b.date.replace(/"/g, '').split('/').map(Number);
    
    const dateA = new Date(2000 + aYear, aMonth - 1, aDay);
    const dateB = new Date(2000 + bYear, bMonth - 1, bDay);
    
    return dateA.getTime() - dateB.getTime();
  });

  const postIndex = sortedPosts.findIndex(post => post.id === params.slug) + 1;

  if (!postData) {
    return (
      <div className="pt-12">
        <div className="max-w-4xl px-6">
          <h1 className={`text-2xl font-bold mb-4 ${playfair.className}`}>Post not found</h1>
          <Link href="/writing" className="text-gray-500 hover:text-black transition-colors">
            ← Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="max-w-full md:max-w-[65%]">
          <BlogNavBar date={postData.date} title={postData.title} index={postIndex} />
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          <div className="flex-1">
            <article className="prose lg:prose-lg">
              <div className="mb-6">
                <h1 className={`text-2xl font-bold mb-4 text-black ${playfair.className}`}>{postData.title}</h1>
              </div>
              <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
            </article>
          </div>
          <SectionsSideBar headings={postData.headings || []} />
        </div>
      </div>
    </div>
  );
}
