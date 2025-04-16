import { getAboutData } from "@/lib/api"
import Projects from "@/components/projects"
import Tools from "@/components/tools"
import Testimonials from "@/components/testimonials"
import BlogPosts from "@/components/blog-posts"
import Faq from "@/components/faq"
import Contact from "@/components/contact"
import MainContent from "@/components/main-content"

export default async function Home() {
  const aboutData = await getAboutData()

  return (
    <MainContent>
      <Projects />
      <Tools />
      <Testimonials />
      <BlogPosts />
      <Faq />
      <Contact />
    </MainContent>
  )
}
