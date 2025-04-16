export async function getAboutData() {
  try {
    const response = await fetch("https://strapi.basatmaqsood.com/api/abouts?populate=*", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch about data")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching about data:", error)
    return null
  }
}
