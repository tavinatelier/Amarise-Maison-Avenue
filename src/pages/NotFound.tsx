import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { RevealSection } from "@/components/common/RevealSection";
import { SEOHead } from "@/components/seo";

/**
 * 404 Page - Luxury-grade, calm error experience
 * SEO: noindex to prevent search engine indexing
 */
const NotFound = () => {
  return (
    <Layout>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for seems to have wandered off."
        noIndex={true}
      />
      <section className="min-h-screen flex items-center justify-center">
        <RevealSection className="container-editorial text-center">
          <p className="text-caption mb-6">Page Not Found</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8">404</h1>
          <p className="text-muted-foreground mb-12 max-w-md mx-auto">
            The page you're looking for seems to have wandered off.
          </p>
          <Link to="/" className="btn-luxury-primary">Return Home</Link>
        </RevealSection>
      </section>
    </Layout>
  );
};

export default NotFound;
