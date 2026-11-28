import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

// A page section. scroll-mt keeps the title clear of the fixed header when a
// nav link jumps here.
const SectionWrapper = ({ id, className, children, ...props }: SectionWrapperProps) => (
  <section id={id} className={cn("relative scroll-mt-20", className)} {...props}>
    {children}
  </section>
);

export default SectionWrapper;
