"use client";

import { Github, Play, FolderOpen, Globe, BookOpen, ArrowUpRight } from "lucide-react";
import type { ResourceLink, LinkType } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const ICONS: Record<LinkType, typeof Github> = {
  github: Github,
  video: Play,
  drive: FolderOpen,
  web: Globe,
  publication: BookOpen,
};

export default function LinkPill({ link }: { link: ResourceLink }) {
  const Icon = ICONS[link.type];
  const { t } = useLanguage();
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/pill inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-fg/85 transition-all hover:border-white/25 hover:bg-white/10"
    >
      <Icon size={13} className="text-brand-2" />
      {t(link.label)}
      <ArrowUpRight
        size={12}
        className="opacity-50 transition-transform group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5"
      />
    </a>
  );
}
