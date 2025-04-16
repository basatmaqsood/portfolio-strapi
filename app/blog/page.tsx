import { blogPosts } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import MainContent from "@/components/main-content"

export default function BlogPage() {
  return (
    <MainContent
      title="Design Thoughts and Perspectives"
      subtitle="Insights, ideas, and reflections on design, development, and the digital landscape"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group">
            <div className="content-card rounded-xl overflow-hidden border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="relative h-60 w-full">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="text-gray-400 text-sm mb-2">{post.date}</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </MainContent>
  )
}
