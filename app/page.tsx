// import { getAboutData } from "@/lib/api"
import Projects from "@/components/projects"
import Tools from "@/components/tools"
import Testimonials from "@/components/testimonials"
import BlogPosts from "@/components/blog-posts"
import Faq from "@/components/faq"
import Contact from "@/components/contact"
// import MainContent from "@/components/main-content"

import { getAboutData } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import MainContent from "@/components/main-content"




export default async function Home() {
  const aboutData = await getAboutData()
  const profile = aboutData?.data[0] || {
    Name: "Basat Maqsood",
    job: "Frontend Developer",
    citizenship: "Pakistan",
    email: "itzbasatmaqsood@gmail.com",
    address: "Islamabad, Pakistan",
    bio: "Hi I am Basat, a Frontend developer and",
    age: 20,
  }

  return (
    <MainContent>
<div className="content-card rounded-xl p-8 mt-2">
  <div className="flex flex-col md:flex-row items-start gap-8">
    
    {/* Profile Image */}
    <div className="relative w-40 h-40 shrink-0 rounded-full overflow-hidden border-4 border-orange-200 mx-auto md:mx-0">
      <Image src="/dp.jpg" alt={profile.Name} fill className="object-cover" />
    </div>

    {/* Bio + Info */}
    <div className="flex-1 space-y-6">
      {/* Bio */}
      <p className="text-gray-300 text-base md:text-lg leading-relaxed">{profile.bio}</p>

      {/* Personal Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
        <p>
          <span className="font-semibold text-purple-500">Name: </span>
          {profile.Name}
        </p>
        <p>
          <span className="font-semibold text-purple-500">Age: </span>
          {profile.age} Years
        </p>
        <p>
          <span className="font-semibold text-purple-500">Citizenship: </span>
          {profile.citizenship}
        </p>
        <p>
          <span className="font-semibold text-purple-500">Job: </span>
          {profile.job}
        </p>
        <p className="col-span-2">
          <span className="font-semibold text-purple-500">E-mail: </span>
          {profile.email}
        </p>
      </div>

      {/* CV Button */}
      {profile.cv && profile.cv[0] && (
        <div className="pt-2">
          <Link
            href={profile.cv[0].url}
            target="_blank"
            className="bg-purple-500 hover:bg-purple-600 transition-all ease  text-white font-semibold px-6 py-2 rounded-md "
          >
            Download CV
          </Link>
        </div>
      )}
    </div>
  </div>
</div>

      <Projects />
      {/* <Tools /> */}
      {/* <Testimonials /> */}
      <BlogPosts />
      {/* <Faq /> */}
      <Contact />
    </MainContent>
  )
}
