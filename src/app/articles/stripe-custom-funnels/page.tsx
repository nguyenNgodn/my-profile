import Link from "next/link";
import Image from "next/image";
import styles from "./article.module.css";

export const metadata = {
  title: "Building Custom Funnels & Multi-country Payments with Stripe | Ngo Ngoc Nguyen",
  description: "A technical guide to architecting high-converting custom product configurator funnels and integrating Stripe dynamic multi-currency, localized payment methods, and idempotent webhooks.",
};

export default function StripeEcommerceArticle() {
  return (
    <div className={styles.wrapper}>
      {/* Top Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link href="/" className={styles.backLink}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Portfolio
            </Link>
            <span className={styles.badge}>E-Commerce / Stripe / Next.js</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContainer}>
            <div className={styles.metaRow}>
              <span className={styles.category}>E-Commerce Architecture</span>
              <span className={styles.dot}>•</span>
              <span className={styles.readTime}>11 min read</span>
              <span className={styles.dot}>•</span>
              <span className={styles.date}>E-Commerce Engineering Guide</span>
            </div>
            
            <h1 className={styles.title}>
              Building Custom Funnels & Multi-country Payments with Stripe
            </h1>
            
            <p className={styles.subtitle}>
              Standard shopping carts fail when customers need multi-step visual customization or localized global currencies. Discover how to build dynamic step funnels, integrate Stripe Elements across 135+ currencies, handle localized tax/VAT, and ensure 100% reliable webhook fulfillment.
            </p>

            <div className={styles.authorRow}>
              <div className={styles.authorAvatar}>NN</div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>Ngo Ngoc Nguyen</span>
                <span className={styles.authorRole}>Full Stack Developer & E-Commerce Specialist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.articleBody}>

            {/* Featured Image */}
            <div className={styles.imageContainer}>
              <Image
                src="/images/stripe_ecommerce_cover.jpg"
                alt="Stripe Multi-Country Payments Architecture"
                width={860}
                height={484}
                className={styles.articleCoverImage}
                priority
              />
              <span className={styles.imageCaption}>Global Stripe Payment Gateway Architecture & Dynamic Product Builder Funnel</span>
            </div>
            
            {/* Intro Callout */}
            <div className={styles.introBox}>
              <h2>Beyond Off-The-Shelf Shopping Carts</h2>
              <p>
                Off-the-shelf platforms like Shopify or WooCommerce work well for generic catalog stores. But when customers need bespoke product configurators—custom dimensions, dynamic add-ons, or multi-step personalization—traditional cart flows create friction and drop-offs.
              </p>
              <p>
                Moreover, scaling globally requires presenting localized currencies (USD, EUR, JPY, GBP, VND), supporting regional payment rails (iDEAL, Klarna, Alipay, credit cards), and handling multi-jurisdiction VAT/sales tax without manual bookkeeping.
              </p>
            </div>

            {/* Section 1 */}
            <section className={styles.sectionBlock}>
              <h2>Core Technical Challenges Solved</h2>
              <ul className={styles.checkList}>
                <li>Decoupling product customization logic from rigid catalog schemas using custom stateful funnels.</li>
                <li>Dynamic multi-currency pricing calculation based on IP geolocation and customer preference.</li>
                <li>Integrating Stripe Payment Elements for seamless inline credit card and localized payment method rendering.</li>
                <li>Implementing robust, idempotent Stripe webhook handling to prevent double fulfillment or missed orders.</li>
                <li>Calculating automatic localized taxes, VAT, and shipping surcharges before checkout initialization.</li>
              </ul>
            </section>

            {/* Pipeline Architecture Diagram */}
            <section className={styles.sectionBlock}>
              <h2>Funnel Execution Architecture</h2>
              
              <div className={styles.pipelineDiagram}>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>01</div>
                  <div className={styles.stepTitle}>Visual Configurator</div>
                  <div className={styles.stepDesc}>Stateful customization funnel</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>02</div>
                  <div className={styles.stepTitle}>Currency & Tax Engine</div>
                  <div className={styles.stepDesc}>Geo-IP currency & Stripe Tax calculation</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>03</div>
                  <div className={styles.stepTitle}>Stripe Intent</div>
                  <div className={styles.stepDesc}>Create PaymentIntent on backend</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>04</div>
                  <div className={styles.stepTitle}>Stripe Elements</div>
                  <div className={styles.stepDesc}>Localized inline checkout rendering</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>05</div>
                  <div className={styles.stepTitle}>Idempotent Webhook</div>
                  <div className={styles.stepDesc}>Verify signature & fulfill order</div>
                </div>
              </div>
            </section>

            {/* Feature Cards Grid */}
            <div className={styles.gridContainer}>
              
              {/* Card 1 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>01</span>
                  <h3>Stateful Product Configurator Funnel</h3>
                </div>
                <p>
                  Instead of forcing users to select options on standard dropdown pages, custom React state machines guide users step-by-step with real-time visual previews, price updates, and validation guards.
                </p>
              </div>

              {/* Card 2 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>02</span>
                  <h3>Dynamic Multi-Currency Pricing</h3>
                </div>
                <p>
                  Prices are resolved dynamically on the server based on customer location and Stripe Adaptive Pricing rules. Avoids conversion friction by displaying amounts natively in 135+ currencies.
                </p>
              </div>

              {/* Card 3 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>03</span>
                  <h3>Stripe Payment Elements Integration</h3>
                </div>
                <p>
                  Renders unified, responsive payment interfaces supporting Apple Pay, Google Pay, iDEAL, Bancontact, and traditional cards without redirecting users away from the brand experience.
                </p>
              </div>

              {/* Card 4 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>04</span>
                  <h3>Idempotent Webhook Delivery</h3>
                </div>
                <p>
                  Webhooks handle fulfillment asynchronously. Using Redis lock mechanisms and Stripe signature verification guarantees zero duplicate order processing even under network retries.
                </p>
              </div>

            </div>

            {/* Summary Box */}
            <div className={styles.summaryBox}>
              <h2>Best Practices Summary</h2>
              <div className={styles.lessonsGrid}>
                <div className={styles.lessonItem}>
                  <h4>Custom Funnels First</h4>
                  <p>Guiding customers through multi-step choices increases conversion rates by reducing cognitive fatigue.</p>
                </div>
                <div className={styles.lessonItem}>
                  <h4>Native Local Currencies</h4>
                  <p>Display prices in local currency at checkout to reduce cart abandonment rates by up to 25%.</p>
                </div>
                <div className={styles.lessonItem}>
                  <h4>Idempotent Webhooks</h4>
                  <p>Never trigger database or inventory state changes directly from client callbacks—rely on verified webhooks.</p>
                </div>
                <div className={styles.lessonItem}>
                  <h4>Automated Tax Compliance</h4>
                  <p>Use Stripe Tax to automatically capture regional VAT, GST, and sales tax across global jurisdictions.</p>
                </div>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className={styles.articleFooter}>
              <Link href="/#articles" className={styles.backButton}>
                ← Return to Articles
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
