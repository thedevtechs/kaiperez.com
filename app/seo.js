const fallbackSiteUrl = "https://kaiperez.com";

function cleanSiteUrl(value = fallbackSiteUrl) {
  return value.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Kai Perez",
  email: "kaiperez@gmail.com",
  url: cleanSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  title: "Kai Perez | Senior Technical Operator for Expensive Product & Growth Problems",
  description:
    "Kai Perez is a senior technical operator for founders and leadership teams facing expensive ambiguity across product, AI, commerce, infrastructure, and growth.",
  ogImageAlt:
    "Kai Perez, senior technical operator for expensive product, AI, commerce, infrastructure, and growth decisions.",
  keywords: [
    "Kai Perez",
    "senior technical operator",
    "technical operator",
    "fractional technical operator",
    "technical strategy consultant",
    "product operations consultant",
    "AI workflow automation",
    "commerce systems consultant",
    "AWS infrastructure strategy",
    "startup technical leadership",
    "growth systems operator",
    "founder technical partner",
  ],
};

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getProfileJsonLd() {
  const personId = absoluteUrl("/#kai-perez");
  const websiteId = absoluteUrl("/#website");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profile"),
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "en-US",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: siteConfig.url,
        email: `mailto:${siteConfig.email}`,
        jobTitle: "Senior Technical Operator",
        description:
          "Senior technical operator for leadership teams facing expensive ambiguity across product, AI workflow strategy, commerce systems, infrastructure direction, and growth operations.",
        knowsAbout: [
          "Product strategy and execution",
          "Technical systems architecture",
          "AI workflow operations",
          "Commerce systems and Shopify operations",
          "AWS infrastructure strategy",
          "Growth systems and operating metrics",
          "Brand positioning for software and ecommerce products",
        ],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Product strategy and execution",
              serviceType: "Technical product operating, prioritization, and launch execution",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI workflow operations",
              serviceType: "LLM workflow strategy, internal automation, and review-system design",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Commerce systems leadership",
              serviceType: "Storefront performance, tracking, checkout, and operational systems",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Infrastructure and reliability direction",
              serviceType: "Cloud architecture, release process, observability, and cost discipline",
            },
          },
        ],
      },
    ],
  };
}
