import { getAboutData } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import MainContent from "@/components/main-content"

export default async function AboutPage() {
  const aboutData = await getAboutData()
  const profile = aboutData?.data[0] || {
    Name: "Basat Maqsood",
    job: "Frontend Developer",
    citizenship: "Pakistan",
    email: "itzbasatmaqsood@gmail.com",
    address: "Islamabad, Pakistan",
    bio: "Hi I am Basat, a Frontend developer",
    age: 20,
  }

  return (
    <MainContent title="About Me" subtitle="Learn more about my background and skills">
      <div className="content-card rounded-xl p-8 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl opacity-20 blur-xl animate-pulse-slow"></div>
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-purple-500/20">
              <Image src="/dp.jpg" alt={profile.Name} fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-gray-300 text-lg">{profile.bio}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div>
                <h3 className="text-gray-400 mb-1">Name</h3>
                <p className="font-medium">{profile.Name}</p>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Email</h3>
                <p className="font-medium">{profile.email}</p>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Location</h3>
                <p className="font-medium">{profile.address}</p>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Age</h3>
                <p className="font-medium">{profile.age}</p>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Citizenship</h3>
                <p className="font-medium">{profile.citizenship}</p>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Job</h3>
                <p className="font-medium">{profile.job}</p>
              </div>
            </div>

            <div className="pt-6">
              {profile.cv && profile.cv[0] && (
                <Link href={profile.cv[0].url} target="_blank" className="btn-primary inline-flex">
                  Download CV
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  )
}
