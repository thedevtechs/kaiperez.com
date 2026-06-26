import AboutPage from "../components/AboutPage";
import { absoluteUrl, siteConfig } from "../seo";

export const metadata = {
  title: "About Kai Perez",
  description:
    "Meet Kai Perez, a technical operator helping founder-led businesses turn messy digital problems into things that work.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Kai Perez",
    description:
      "A practical technical operator for websites, commerce, AI workflows, infrastructure, codebases, analytics, and brand execution.",
    url: absoluteUrl("/about"),
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/kai-arms-crossed.png"),
        width: 1024,
        height: 1024,
        alt: "Kai Perez standing with arms crossed.",
      },
    ],
  },
};

export default function Page() {
  return <AboutPage />;
}
