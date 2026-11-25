import { config } from "@/data/config";
import ResumeView from "../resume/resume-view";

export const metadata = {
  title: `CV | ${config.author}`,
  description: `Research CV of ${config.author}, ${config.headline}. View online or download the PDF.`,
};

export default function CVPage() {
  return <ResumeView doc="cv" />;
}
