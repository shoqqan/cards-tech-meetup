/**
 * Cards Tech Meetup API — типы сущностей.
 * Base URL: http://localhost:8080
 */

export interface Speaker {
  id: string
  name: string
  role: string
}

export interface Tag {
  name: string
}

export interface Talk {
  id: string
  title: string
  speaker: Speaker
  durationMinutes: number | null
  date: string
  description: string | null
  videoUrl: string | null
  tags: Tag[]
}

export interface CreateTalkRequest {
  title: string
  speakerId: string
  durationMinutes?: number
  date?: string
  description?: string
  videoUrl?: string
  tagNames?: string[]
}

export type UpdateTalkRequest = Partial<CreateTalkRequest>

export type UpdateSpeakerRequest = Partial<Pick<Speaker, "name" | "role">>

export type UpdateTagRequest = { name: string }
