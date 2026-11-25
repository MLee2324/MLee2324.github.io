import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.site,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...(config.resume
      ? [{ url: `${config.site}/resume/`, changeFrequency: "monthly" as const, priority: 0.8 }]
      : []),
    ...(config.cv
      ? [{ url: `${config.site}/cv/`, changeFrequency: "monthly" as const, priority: 0.7 }]
      : []),
  ];
}
