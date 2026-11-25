"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PUBLICATIONS, Publication } from "@/data/publications";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const LINK_LABELS: Record<keyof NonNullable<Publication["links"]>, string> = {
  paper: "Paper",
  pdf: "PDF",
  doi: "DOI",
  code: "Code",
  poster: "Poster",
  slides: "Slides",
};

const Authors = ({ authors }: { authors: string[] }) => (
  <p className="text-sm text-muted-foreground">
    {authors.map((name, i) => (
      <Fragment key={name}>
        {i > 0 && ", "}
        <span className={cn(name === config.author && "font-semibold text-foreground")}>{name}</span>
      </Fragment>
    ))}
  </p>
);

const PublicationsSection = () => {
  return (
    <SectionWrapper id="publications" className="max-w-4xl mx-auto py-24 px-4 min-h-[70vh]">
      <SectionHeader
        id="publications"
        title="Publications"
        desc="Papers, posters, and presentations"
        className="static mb-12 md:mb-16"
      />
      {PUBLICATIONS.length === 0 ? (
        <p className="text-center text-muted-foreground">Publications will be listed here.</p>
      ) : (
        <ol className="flex flex-col gap-4">
          {PUBLICATIONS.map((pub, index) => (
            <motion.li
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="bg-white/70 dark:bg-black/60 backdrop-blur-sm border-border hover:border-primary/20 transition-colors duration-300">
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-0.5">
                      {pub.type}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{pub.date}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight">{pub.title}</h3>
                  {pub.authors && pub.authors.length > 0 && <Authors authors={pub.authors} />}
                  <p className="text-sm italic text-muted-foreground">{pub.venue}</p>
                  {pub.summary && (
                    <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{pub.summary}</p>
                  )}
                  {pub.links && Object.keys(pub.links).length > 0 && (
                    <div className="flex flex-wrap gap-4 pt-1">
                      {(Object.keys(LINK_LABELS) as (keyof typeof LINK_LABELS)[])
                        .filter((key) => pub.links?.[key])
                        .map((key) => (
                          <a
                            key={key}
                            href={pub.links![key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                          >
                            {LINK_LABELS[key]}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </ol>
      )}
    </SectionWrapper>
  );
};

export default PublicationsSection;
