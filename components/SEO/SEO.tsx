import Head from 'next/head';
import Script from 'next/script';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  breadcrumbs?: Array<{
    position: number;
    name: string;
    item: string;
  }>;
}

export default function SEO({
  title,
  description,
  canonical = 'https://kaiperez.dev',
  ogImage = 'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/kai-profile.jpg',
  ogType = 'website',
  noindex = false,
  breadcrumbs = []
}: SEOProps) {
  const fullTitle = `${title} | Kai Perez`;

  // Create the breadcrumb JSON-LD
  const breadcrumbsSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map(crumb => ({
      "@type": "ListItem",
      "position": crumb.position,
      "name": crumb.name,
      "item": crumb.item
    }))
  } : null;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        
        {/* Robots Control */}
        <meta 
          name="robots" 
          content={`${noindex ? 'noindex' : 'index'}, follow`} 
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonical} />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Kai Perez" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@kaiperez" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      {/* JSON-LD Schema */}
      {breadcrumbsSchema && (
        <Script 
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
        />
      )}
    </>
  );
} 