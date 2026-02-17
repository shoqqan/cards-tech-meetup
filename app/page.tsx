import { TalksFilter } from "@/components/talks-filter"
import { fetchTalks, getAllTagsFromTalks } from "@/lib/talks"

export default async function HomePage() {
  const talks = await fetchTalks()
  const allTags = getAllTagsFromTalks(talks)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
          CARDS TECH MEETUP
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Записи докладов нашей команды. {talks.length} докладов об архитектуре,
          фронтенде, DevOps, тестировании и базах данных.
        </p>
      </div>
      <TalksFilter talks={talks} allTags={allTags} />
    </main>
  )
}
