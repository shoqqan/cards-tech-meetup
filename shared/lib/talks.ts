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

export const talks: Talk[] = [
  {
    id: "microservices-migration",
    title: "Миграция на микросервисы: уроки и боль",
    speaker: "Алексей Петров",
    speakerRole: "Tech Lead, Backend",
    duration: "42 мин",
    date: "14 февраля 2026",
    tags: ["Backend", "Microservices", "Architecture"],
    description:
      "Как мы перешли с монолита на микросервисную архитектуру за 8 месяцев. Разберём основные проблемы, с которыми столкнулась команда: распределённые транзакции, service discovery, мониторинг и трассировка. Поделюсь конкретными решениями и метриками до/после миграции.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailColor: "from-green-500/20 to-emerald-700/20",
  },
  {
    id: "react-server-components",
    title: "React Server Components в продакшене",
    speaker: "Мария Козлова",
    speakerRole: "Senior Frontend Developer",
    duration: "35 мин",
    date: "14 февраля 2026",
    tags: ["Frontend", "React", "Performance"],
    description:
      "Практический опыт внедрения React Server Components в крупном проекте. Покажу реальные кейсы оптимизации, расскажу про подводные камни при работе с серверными и клиентскими компонентами, и продемонстрирую результаты по метрикам Web Vitals.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailColor: "from-emerald-500/20 to-teal-700/20",
  },
  {
    id: "kubernetes-autoscaling",
    title: "Автоскейлинг в Kubernetes: от HPA до KEDA",
    speaker: "Дмитрий Сидоров",
    speakerRole: "DevOps Engineer",
    duration: "50 мин",
    date: "14 февраля 2026",
    tags: ["DevOps", "Kubernetes", "Infrastructure"],
    description:
      "Глубокое погружение в механизмы автоскейлинга Kubernetes. Разберём HPA, VPA, Cluster Autoscaler и KEDA. Покажу как мы настроили автоскейлинг для обработки пиковых нагрузок и сократили расходы на инфраструктуру на 40%.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailColor: "from-teal-500/20 to-green-800/20",
  },
  {
    id: "api-design-best-practices",
    title: "Проектирование API: REST, GraphQL или gRPC?",
    speaker: "Елена Волкова",
    speakerRole: "Software Architect",
    duration: "38 мин",
    date: "14 февраля 2026",
    tags: ["API", "Architecture", "Backend"],
    description:
      "Сравниваем три подхода к проектированию API на реальных примерах из наших проектов. Когда REST достаточно, когда стоит использовать GraphQL, и в каких случаях gRPC — единственный правильный выбор. Разберём trade-offs каждого подхода.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailColor: "from-lime-500/20 to-green-700/20",
  },
  {
    id: "testing-strategies",
    title: "Стратегии тестирования: пирамида или трофей?",
    speaker: "Игорь Новиков",
    speakerRole: "QA Lead",
    duration: "30 мин",
    date: "14 февраля 2026",
    tags: ["Testing", "QA", "Best Practices"],
    description:
      "Обсуждаем современные подходы к тестированию: классическая пирамида тестирования vs testing trophy. Расскажу как мы построили стратегию тестирования, которая позволяет деплоить 15 раз в день с минимальным количеством багов в продакшене.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailColor: "from-green-400/20 to-emerald-600/20",
  },
  {
    id: "database-optimization",
    title: "PostgreSQL: оптимизация запросов на практике",
    speaker: "Андрей Морозов",
    speakerRole: "Database Engineer",
    duration: "45 мин",
    date: "14 февраля 2026",
    tags: ["Database", "PostgreSQL", "Performance"],
    description:
      "Практическое руководство по оптимизации SQL-запросов в PostgreSQL. Разберём EXPLAIN ANALYZE, индексы, партицирование таблиц и CTE. Покажу реальные примеры, где оптимизация ускорила запросы с 30 секунд до 50 миллисекунд.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailColor: "from-emerald-400/20 to-green-800/20",
  },
];

export function getTalkById(id: string): Talk | undefined {
  return talks.find((talk) => talk.id === id);
}

export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  talks.forEach((talk) => talk.tags.forEach((tag) => tagsSet.add(tag)));
  return Array.from(tagsSet).sort();
}
