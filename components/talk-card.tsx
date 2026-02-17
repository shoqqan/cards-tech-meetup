import Link from "next/link"
import { Clock, User, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Talk } from "@/lib/talks"

export function TalkCard({ talk }: { talk: Talk }) {
  return (
    <Link href={`/talk/${talk.id}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <div
          className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${talk.thumbnailColor}`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6 text-foreground" fill="currentColor" />
          </div>
          <div className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {talk.duration}
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <h3 className="text-base font-semibold leading-snug text-foreground text-pretty line-clamp-2">
            {talk.title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground leading-tight">
                {talk.speaker}
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                {talk.speakerRole}
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {talk.description}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {talk.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[11px] font-medium text-secondary-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{talk.date}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
