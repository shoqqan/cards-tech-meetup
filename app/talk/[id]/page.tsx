import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { fetchTalkById } from "@/lib/talks"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const talk = await fetchTalkById(id)
  if (!talk) return { title: "Talk Not Found" }
  return {
    title: `${talk.title} — CARDS TECH MEETUP`,
    description: talk.description,
  }
}

export default async function TalkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const talk = await fetchTalkById(id)

  if (!talk) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All Talks
      </Link>

      <div className="flex flex-col gap-8">
        {/* Video Player */}
        {talk.videoUrl ? (
          <div className="overflow-hidden rounded-xl border border-border/50">
            <div className="relative aspect-video w-full bg-card">
              <iframe
                src={talk.videoUrl}
                title={talk.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        ) : null}

        {/* Talk Details */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground text-pretty sm:text-3xl">
              {talk.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {talk.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {talk.date}
              </span>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Speaker Info */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-foreground">
                {talk.speaker}
              </span>
              <span className="text-sm text-muted-foreground">
                {talk.speakerRole}
              </span>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Tags */}
          <div className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Tag className="h-4 w-4" />
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {talk.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-medium text-secondary-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Description */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </h2>
            <p className="text-base leading-relaxed text-foreground/85">
              {talk.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
