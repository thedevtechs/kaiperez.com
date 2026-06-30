import AboutPage from "../components/AboutPage";
import { absoluteUrl, siteConfig } from "../seo";

export const metadata = {
  title: "About Kai Perez",
  description:
    "Meet Kai Perez, a founder-operator creating magnetic digital experiences for ecommerce brands, storefronts, systems, and launches.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Kai Perez",
    description:
      "A magnetic founder-operator for ecommerce brands, websites, storefronts, workflow automation, infrastructure, analytics, and brand execution.",
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
