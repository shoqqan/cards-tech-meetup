import { getTalks as getTalksApi, getTalk as getTalkApi } from "@/lib/api";
import type { Talk as ApiTalk } from "@/lib/types";

/** Формат доклада для UI (карточки, страница, фильтры). */
export interface Talk {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  duration: string;
  date: string;
  tags: string[];
  description: string;
  videoUrl: string;
  thumbnailColor: string;
}

const THUMBNAIL_COLORS = [
  "from-green-500/20 to-emerald-700/20",
  "from-emerald-500/20 to-teal-700/20",
  "from-teal-500/20 to-green-800/20",
  "from-lime-500/20 to-green-700/20",
  "from-green-400/20 to-emerald-600/20",
  "from-emerald-400/20 to-green-800/20",
] as const;

function thumbnailColorForId(id: string): string {
  let n = 0;
  for (let i = 0; i < id.length; i++) n = (n * 31 + id.charCodeAt(i)) >>> 0;
  return THUMBNAIL_COLORS[n % THUMBNAIL_COLORS.length];
}

function formatDuration(minutes: number | null): string {
  if (minutes == null) return "—";
  return `${minutes} мин`;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function mapApiTalkToDisplay(t: ApiTalk): Talk {
  return {
    id: t.id,
    title: t.title,
    speaker: t.speaker.name,
    speakerRole: t.speaker.role,
    duration: formatDuration(t.durationMinutes),
    date: formatDate(t.date),
    tags: t.tags.map((tag) => tag.name),
    description: t.description ?? "",
    videoUrl: t.videoUrl ?? "",
    thumbnailColor: thumbnailColorForId(t.id),
  };
}

/** Загружает все доклады с API и возвращает в формате для UI. */
export async function fetchTalks(): Promise<Talk[]> {
  const list = await getTalksApi();
  return list.map(mapApiTalkToDisplay);
}

/** Загружает один доклад по id. Возвращает null при 404 или 400 (неверный id, например slug вместо UUID). */
export async function fetchTalkById(id: string): Promise<Talk | null> {
  try {
    const t = await getTalkApi(id);
    return mapApiTalkToDisplay(t);
  } catch (e) {
    const status = e && typeof e === "object" && "status" in e ? (e as { status: number }).status : undefined;
    if (status === 404 || status === 400) {
      return null;
    }
    throw e;
  }
}

/** Список всех тегов из докладов (для фильтра). Вызывать после fetchTalks или отдельно через API по необходимости. */
export function getAllTagsFromTalks(talks: Talk[]): string[] {
  const set = new Set<string>();
  for (const talk of talks) {
    for (const tag of talk.tags) set.add(tag);
  }
  return Array.from(set).sort();
}
