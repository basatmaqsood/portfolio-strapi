import { blogPosts } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import MainContent from "@/components/main-content"

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((post) => post.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <MainContent>
      <div className="mb-8">
        <Link href="/blog" className="text-purple-400 hover:text-purple-300 transition-colors">
          ← Back to all posts
        </Link>
      </div>

      <article className="content-card rounded-xl overflow-hidden border border-gray-800/50">
        <div className="relative h-80 w-full">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div className="p-8">
          <div className="text-gray-400 mb-4">{post.date}</div>
          <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <p className="text-gray-300 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-4">The Importance of User Experience</h2>
            <p className="text-gray-300 mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li className="mb-2">Focus on user needs and goals</li>
              <li className="mb-2">Create intuitive navigation and interfaces</li>
              <li className="mb-2">Ensure accessibility for all users</li>
              <li className="mb-2">Test with real users and iterate based on feedback</li>
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-4">Best Practices for Implementation</h2>
            <p className="text-gray-300 mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo.
            </p>
            <blockquote className="border-l-4 border-purple-500 pl-4 italic my-6 text-gray-300">
              "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs
            </blockquote>
            <p className="text-gray-300">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
      </article>
    </MainContent>
  )
}
