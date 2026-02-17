/**
 * Cards Tech Meetup API — клиент.
 * Base URL: http://localhost:8080
 * Все эндпоинты публичные, аутентификации нет.
 */

import type {
  Speaker,
  Tag,
  Talk,
  CreateTalkRequest,
  UpdateTalkRequest,
  UpdateSpeakerRequest,
  UpdateTagRequest,
} from "./types"

const BASE_URL = "http://localhost:8080/api"

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (res.status === 204) {
    return undefined as T
  }

  const text = await res.text()
  let body: unknown
  try {
    body = text ? JSON.parse(text) : undefined
  } catch {
    body = text
  }

  if (!res.ok) {
    throw new ApiError(
      res.status === 404 ? "Not found" : `API error: ${res.status}`,
      res.status,
      body
    )
  }

  return body as T
}

// ——— Speakers ———

export function getSpeakers(): Promise<Speaker[]> {
  return request<Speaker[]>(`${BASE_URL}/speakers`)
}

export function getSpeaker(id: string): Promise<Speaker> {
  return request<Speaker>(`${BASE_URL}/speakers/${id}`)
}

export function createSpeaker(data: { name: string; role: string }): Promise<Speaker> {
  return request<Speaker>(`${BASE_URL}/speakers`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function updateSpeaker(id: string, data: UpdateSpeakerRequest): Promise<Speaker> {
  return request<Speaker>(`${BASE_URL}/speakers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export function deleteSpeaker(id: string): Promise<void> {
  return request<void>(`${BASE_URL}/speakers/${id}`, { method: "DELETE" })
}

// ——— Tags ———

export function getTags(): Promise<Tag[]> {
  return request<Tag[]>(`${BASE_URL}/tags`)
}

export function getTag(name: string): Promise<Tag> {
  return request<Tag>(`${BASE_URL}/tags/${encodeURIComponent(name)}`)
}

export function createTag(data: { name: string }): Promise<Tag> {
  return request<Tag>(`${BASE_URL}/tags`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function updateTag(name: string, data: UpdateTagRequest): Promise<Tag> {
  return request<Tag>(`${BASE_URL}/tags/${encodeURIComponent(name)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export function deleteTag(name: string): Promise<void> {
  return request<void>(`${BASE_URL}/tags/${encodeURIComponent(name)}`, {
    method: "DELETE",
  })
}

// ——— Talks ———

export function getTalks(): Promise<Talk[]> {
  return request<Talk[]>(`${BASE_URL}/talks`)
}

export function getTalk(id: string): Promise<Talk> {
  return request<Talk>(`${BASE_URL}/talks/${id}`)
}

export function createTalk(data: CreateTalkRequest): Promise<Talk> {
  return request<Talk>(`${BASE_URL}/talks`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function updateTalk(id: string, data: UpdateTalkRequest): Promise<Talk> {
  return request<Talk>(`${BASE_URL}/talks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export function deleteTalk(id: string): Promise<void> {
  return request<void>(`${BASE_URL}/talks/${id}`, { method: "DELETE" })
}
