import Link from "next/link";
import { Play } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Play
              className="h-4 w-4 text-primary-foreground"
              fill="currentColor"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground leading-tight">
              CARDS TECH MEETUP
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground leading-tight">
              TALKS
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
