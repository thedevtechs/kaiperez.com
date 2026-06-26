const fallbackSiteUrl = "https://kaiperez.com";

function cleanSiteUrl(value = fallbackSiteUrl) {
  return value.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Kai Perez",
  email: "kaiperez@gmail.com",
  url: cleanSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  title: "Kai Perez | Make the Digital Side Feel Less Duct-Taped",
  description:
    "Kai Perez helps founder-led businesses sharpen the brand, build the site or storefront, and fix the digital systems that keep the real business from showing up clearly online.",
  ogImageAlt:
    "Kai Perez, technical operator for brand, websites, commerce, AI workflows, internal tools, analytics, and infrastructure.",
  keywords: [
    "Kai Perez",
    "technical operator",
    "fractional technical operator",
    "digital systems consultant",
    "brand and website consultant",
    "product operations consultant",
    "AI workflow automation",
    "commerce systems consultant",
    "AWS infrastructure consultant",
    "website and Shopify consultant",
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
        jobTitle: "Technical Operator",
        description:
          "Technical operator helping founder-led businesses sharpen the brand, build websites and storefronts, and fix the digital systems around real operations.",
        knowsAbout: [
          "Product planning and execution",
          "Technical systems architecture",
          "AI workflow operations",
          "Commerce systems and Shopify operations",
          "AWS and Linux infrastructure",
          "Growth tracking and analytics",
          "Brand positioning for software and ecommerce products",
        ],
        makesOffer: [
          {
            "@type": "Offer",
            name: "Brand + Systems Audit",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              description: "$1.5k-$3.5k",
            },
            itemOffered: {
              "@type": "Service",
              name: "Brand + Systems Audit",
              serviceType: "Brand and digital systems audit for established small businesses",
              description:
                "Practical audit of website, tracking, forms, checkout, search, speed, follow-up, and operational handoffs.",
            },
          },
          {
            "@type": "Offer",
            name: "Stuck-to-Shipped Sprint",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              description: "$4.5k-$9.5k",
            },
            itemOffered: {
              "@type": "Service",
              name: "Stuck-to-Shipped Sprint",
              serviceType: "Focused brand, website, workflow, or commerce improvement sprint",
              description:
                "One-to-two-week sprint to ship a high-impact digital improvement affecting leads, orders, trust, tracking, or operations.",
            },
          },
          {
            "@type": "Offer",
            name: "Brand + Digital Buildout",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              description: "$12k-$32k",
            },
            itemOffered: {
              "@type": "Service",
              name: "Brand + Digital Buildout",
              serviceType: "Brand, website, product, and commerce buildout",
              description:
                "Brand direction, website, storefront, service funnel, or ordering experience with launch execution and three months of post-launch support.",
            },
          },
          {
            "@type": "Offer",
            name: "Operator Care Plan",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              description: "$1.5k-$4k/mo",
            },
            itemOffered: {
              "@type": "Service",
              name: "Operator Care Plan",
              serviceType: "Ongoing digital maintenance and operator support",
              description:
                "Ongoing maintenance, content updates, tracking checks, small improvements, automations, and vendor/platform decisions.",
            },
          },
        ],
      },
    ],
  };
}
