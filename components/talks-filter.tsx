"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TalkCard } from "@/components/talk-card"
import type { Talk } from "@/lib/talks"

interface TalksFilterProps {
  talks: Talk[]
  allTags: string[]
}

export function TalksFilter({ talks, allTags }: TalksFilterProps) {
  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = talks.filter((talk) => {
    const matchesSearch =
      search === "" ||
      talk.title.toLowerCase().includes(search.toLowerCase()) ||
      talk.speaker.toLowerCase().includes(search.toLowerCase()) ||
      talk.description.toLowerCase().includes(search.toLowerCase())

    const matchesTag = activeTag === null || talk.tags.includes(activeTag)

    return matchesSearch && matchesTag
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search talks, speakers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 bg-card pl-10 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className="focus:outline-none"
          >
            <Badge
              variant={activeTag === null ? "default" : "secondary"}
              className={`cursor-pointer text-xs transition-colors ${
                activeTag === null
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              All
            </Badge>
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="focus:outline-none"
            >
              <Badge
                variant={activeTag === tag ? "default" : "secondary"}
                className={`cursor-pointer text-xs transition-colors ${
                  activeTag === tag
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tag}
              </Badge>
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
          <p className="text-lg font-medium text-foreground">Nothing found</p>
          <p className="text-sm text-muted-foreground">
            Try changing your search query or filter
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
        </div>
      )}
    </div>
  )
}
