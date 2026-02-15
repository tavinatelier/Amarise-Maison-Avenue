import { Helmet } from "react-helmet-async";

/**
 * CMS-READY: SEO Meta Component
 * Backend developers: Replace static props with CMS data
 */

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  hreflang?: Array<{ lang: string; href: string }>;
}

export const SEOHead = ({
  title,
  description = "Discover AMARISÉ—a world of refined elegance where beauty meets intention. Explore our curated collection of luxury beauty, atelier fashion, and lifestyle objects.",
  image = "/og-image.jpg",
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "AMARISÉ",
  noIndex = false,
  hreflang,
}: SEOHeadProps) => {
  const siteTitle = "AMARISÉ";
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Luxury Beauty, Fashion & Lifestyle`;
  const canonicalUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* hreflang for international SEO */}
      {hreflang?.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Article specific */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  );
};

/* ────────────────────────────────────────
   JSON-LD Structured Data Components
   ──────────────────────────────────────── */

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  brand?: string;
  sku?: string;
  ratingValue?: number;
  reviewCount?: number;
}

export const ProductSchema = ({
  name,
  description,
  image,
  price,
  currency = "EUR",
  availability = "InStock",
  brand = "AMARISÉ",
  sku,
  ratingValue,
  reviewCount,
}: ProductSchemaProps) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    brand: { "@type": "Brand", name: brand },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      seller: { "@type": "Organization", name: brand },
    },
  };
  if (sku) schema.sku = sku;
  if (ratingValue && reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating: 5,
    };
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export const ArticleSchema = ({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = "AMARISÉ Editorial",
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Organization", name: author },
    publisher: {
      "@type": "Organization",
      name: "AMARISÉ",
      logo: { "@type": "ImageObject", url: "/logo.png" },
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const BreadcrumbSchema = ({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/** Organization Schema — placed once on homepage */
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AMARISÉ",
    alternateName: "Amarise Maison Avenue",
    url: "https://amarisemaisonavenue.com",
    logo: "https://amarisemaisonavenue.com/logo.png",
    description: "A global luxury house encompassing beauty, atelier fashion, and lifestyle objects. A product of Baalvion Industries Private Limited.",
    foundingDate: "2024",
    parentOrganization: {
      "@type": "Organization",
      name: "Baalvion Industries Private Limited",
    },
    sameAs: [
      "https://instagram.com/amarise",
      "https://facebook.com/amarise",
      "https://twitter.com/amarise",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@amarise.com",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/** CollectionPage Schema — for pillar/family pages */
export const CollectionPageSchema = ({
  name,
  description,
  url,
  numberOfItems,
}: {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    numberOfItems,
    isPartOf: {
      "@type": "WebSite",
      name: "AMARISÉ",
      url: "https://amarisemaisonavenue.com",
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/** FAQ Schema */
export const FAQSchema = ({
  questions,
}: {
  questions: Array<{ question: string; answer: string }>;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
