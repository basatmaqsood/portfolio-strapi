import { projects } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import MainContent from "@/components/main-content"

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((project) => project.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <MainContent>
      <div className="mb-8">
        <Link href="/projects" className="text-purple-400 hover:text-purple-300 transition-colors">
          ← Back to all projects
        </Link>
      </div>

      <div className="content-card rounded-xl overflow-hidden border border-gray-800/50">
        <div className="relative h-96 w-full">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-gray-400">{project.category}</p>
            </div>

            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 purple-gradient rounded-full text-white font-medium transition-colors"
              >
                View Live Project
              </Link>
            )}
          </div>

          <div className="prose prose-invert prose-purple max-w-none">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-300 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>

            <h2 className="text-xl font-semibold mb-4">The Challenge</h2>
            <p className="text-gray-300 mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>

            <h2 className="text-xl font-semibold mb-4">The Solution</h2>
            <p className="text-gray-300 mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Project screenshot"
                width={500}
                height={300}
                className="rounded-lg"
              />
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Project screenshot"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>

            <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-300">
              <li className="mb-2">React / Next.js</li>
              <li className="mb-2">Tailwind CSS</li>
              <li className="mb-2">TypeScript</li>
              <li className="mb-2">Framer Motion</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <p className="text-gray-300">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
      </div>
    </MainContent>
  )
}
