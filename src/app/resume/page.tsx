import { config } from "@/data/config";
import ResumeView from "./resume-view";

export const metadata = {
  title: `Résumé | ${config.author}`,
  description: `Résumé of ${config.author}, ${config.headline}. View online or download the PDF.`,
};

export default function ResumePage() {
  return <ResumeView doc="resume" />;
}
