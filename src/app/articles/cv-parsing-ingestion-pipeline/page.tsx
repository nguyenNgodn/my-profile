import Link from "next/link";
import Image from "next/image";
import styles from "./article.module.css";

export const metadata = {
  title: "CV Parsing Ingestion Pipeline using PaddleOCR and Google Gemini | Ngo Ngoc Nguyen",
  description: "A deep dive into parsing messy PDF/Image resumes at scale using PyMuPDF, PaddleOCR GPU pools, Pydantic schema coercion, and Gemini 2.5 Flash.",
};

export default function CvParsingArticle() {
  return (
    <div className={styles.wrapper}>
      {/* Header Navigation */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link href="/" className={styles.backLink}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Portfolio
            </Link>
            <span className={styles.badge}>LLM Pipeline / PaddleOCR / Gemini 2.5</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContainer}>
            <div className={styles.metaRow}>
              <span className={styles.category}>Ingestion & Systems</span>
              <span className={styles.dot}>•</span>
              <span className={styles.readTime}>12 min read</span>
              <span className={styles.dot}>•</span>
              <span className={styles.date}>ShareCV Engineering Case Study</span>
            </div>
            
            <h1 className={styles.title}>
              CV Parsing Ingestion Pipeline using PaddleOCR and Google Gemini
            </h1>
            
            <p className={styles.subtitle}>
              A résumé is not a document. It is a search record that has not been written yet. Learn how ShareCV turns messy PDFs, phone photos, and multi-language CVs into structured JSON with PyMuPDF, locked PaddleOCR GPU pools, Pydantic schema coercion, and Gemini key rotation.
            </p>

            <div className={styles.authorRow}>
              <div className={styles.authorAvatar}>NN</div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>Ngo Ngoc Nguyen</span>
                <span className={styles.authorRole}>Full Stack Developer & AI Engineer</span>
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
                src="/images/cv_parsing_cover.jpg"
                alt="CV Parsing Ingestion Pipeline Dashboard"
                width={860}
                height={484}
                className={styles.articleCoverImage}
                priority
              />
              <span className={styles.imageCaption}>Pipeline Control Dashboard: Real-time OCR Text Boundary Detection & AI Schema JSON Extraction</span>
            </div>
            
            {/* Intro Callout */}
            <div className={styles.introBox}>
              <h2>The Problem with PDFs as Data</h2>
              <p>
                ShareCV does not store PDFs to look at them later. Every uploaded résumé has to become a structured record: name, contact, degrees, industries, levels, employment history, skills, certificates. That record is what recruiters filter, what matching scores against a job description, and what search indexes as if it were a knowledge base of people.
              </p>
              <p>
                The PDF is the worst possible starting point for that job. Some files are born digital with a clean text layer; others are phone photos or contain vanished diacritics under generic OCR. This article explains how ShareCV turns that mess into ingestible JSON: PyMuPDF first, PaddleOCR only when needed, Gemini as a strict HR parser, and a schema layer that refuses to let a creative model break the product.
              </p>
            </div>

            {/* Section 1 */}
            <section className={styles.sectionBlock}>
              <h2>What an Ingestion Pipeline Actually Has to Survive</h2>
              <p>
                A weekend OCR demo dumps text into a prompt and prints JSON. A production CV pipeline must handle operational constraints at scale:
              </p>
              <ul className={styles.checkList}>
                <li>Prefer cheap digital text extraction over GPU OCR on every native PDF.</li>
                <li>Read Vietnamese scanned CVs accurately without destroying tone marks and diacritics.</li>
                <li>Bound GPU use so concurrent uploads cannot thrash or crash PaddleOCR instances.</li>
                <li>Force Gemini to return structured JSON and coerce aliases into standardized database schemas.</li>
                <li>Map taxonomy fields (degree, industry, level) to fixed English lists even when the résumé is Vietnamese or Chinese.</li>
                <li>Keep free-text fields in the résumé’s original language without inventing unstated cities or skills.</li>
                <li>Retry quota errors across rotating Gemini keys, failing gracefully to empty structured fallbacks.</li>
                <li>Truncate oversized prompts so multi-page CVs do not blow API token limits.</li>
              </ul>
            </section>

            {/* Pipeline Architecture Diagram */}
            <section className={styles.sectionBlock}>
              <h2>Pipeline Architecture at a Glance</h2>
              <p>Every uploaded CV follows a strict execution path before indexing:</p>
              
              <div className={styles.pipelineDiagram}>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>01</div>
                  <div className={styles.stepTitle}>Uploaded PDF</div>
                  <div className={styles.stepDesc}>Save to disk & inspect</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>02</div>
                  <div className={styles.stepTitle}>PyMuPDF / PaddleOCR</div>
                  <div className={styles.stepDesc}>Digital layer check (&gt;300 chars), fallback GPU OCR pool</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>03</div>
                  <div className={styles.stepTitle}>Gemini HR Parser</div>
                  <div className={styles.stepDesc}>Strict JSON prompt + fixed taxonomy rules</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>04</div>
                  <div className={styles.stepTitle}>Pydantic Coercion</div>
                  <div className={styles.stepDesc}>Key standardizer, alias mapping, type casting</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>05</div>
                  <div className={styles.stepTitle}>Ingested JSON</div>
                  <div className={styles.stepDesc}>Persist & index in Elasticsearch / Typesense</div>
                </div>
              </div>

              <p className={styles.captionText}>
                The PDF remains the raw source file uploaded by candidates. The search engine, candidate-job matching algorithms, and recruitment UI operate strictly on the validated JSON.
              </p>
            </section>

            {/* Technical Detail Cards */}
            <div className={styles.gridContainer}>
              
              {/* Card 1 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>01</span>
                  <h3>Steal Digital Text Before Using GPU</h3>
                </div>
                <p>
                  Most modern CVs contain native text layers. Running OCR on them is an expensive tax: rasterization at 150 DPI, GPU lock allocation, and compute delay.
                </p>
                <p>
                  <code>fitz (PyMuPDF)</code> opens the file and checks page text. If stripped text exceeds 300 characters, it is accepted immediately. Native PDFs skip the GPU entirely, saving OCR compute for true image scans.
                </p>
              </div>

              {/* Card 2 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>02</span>
                  <h3>PaddleOCR Pool for Scanned CVs</h3>
                </div>
                <p>
                  When digital text is sparse, the file is converted via <code>pdf2image</code> at 150 DPI—a production sweet spot for Vietnamese glyph recognition on 6–8 GB GPUs.
                </p>
                <div className={styles.codeSnippet}>
                  <code>• Model language set to &apos;vi&apos; with angle classification enabled</code>
                  <code>• Single instance pool behind async locks (non-reentrant OCR)</code>
                  <code>• 15s queue timeout with fallback GPU semaphore controls</code>
                </div>
              </div>

              {/* Card 3 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>03</span>
                  <h3>Gemini as a Strict HR Parser</h3>
                </div>
                <p>
                  Extracted text is sent to <code>gemini-2.5-flash</code> with <code>response_mime_type=&quot;application/json&quot;</code> and temperature 0.1.
                </p>
                <ul>
                  <li>Taxonomies (degrees, industries, seniority levels) map to fixed English lists.</li>
                  <li>Free-text fields (skills, descriptions, majors) preserve original languages (Vietnamese/English).</li>
                  <li>Chinese/other languages translate institution and address to Latin for global search facets.</li>
                </ul>
              </div>

              {/* Card 4 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>04</span>
                  <h3>The Schema Layer is the Real Product</h3>
                </div>
                <p>
                  Gemini may still output alias keys like <code>work_history</code> instead of <code>work_experience</code>. A <code>SchemaStandardizer</code> recursively normalizes key variants.
                </p>
                <p>
                  Pydantic models coerce types (e.g. <code>&quot;2 years&quot; → 2</code>, string skills to lists). Validation errors trigger retries, and quota failures default safely to an empty structured CV instead of failing candidate uploads.
                </p>
              </div>

              {/* Card 5 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>05</span>
                  <h3>Separate Extraction from Scoring</h3>
                </div>
                <p>
                  Asking a single prompt to parse a résumé AND evaluate candidate fit causes hallucinations where the model invents candidate strengths to match high scores.
                </p>
                <p>
                  ShareCV cleanly separates extraction from candidate scoring (0–10 rating across tenure stability, skills, degree, and employer brand) into distinct prompts and non-overlapping schemas.
                </p>
              </div>

              {/* Card 6 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>06</span>
                  <h3>Parsed JSON as RAG Corpus for People</h3>
                </div>
                <p>
                  Clean JSON is stored alongside PDFs and serves as the document corpus for CV-JD matching, Elasticsearch, and Typesense indexing.
                </p>
                <p>
                  Matching algorithms construct targeted prompt contexts from structured JSON fields rather than dumping raw noisy PDFs into expensive context windows.
                </p>
              </div>

            </div>

            {/* Summary Lessons Box */}
            <div className={styles.summaryBox}>
              <h2>Engineering Lessons Learned</h2>
              <div className={styles.lessonsGrid}>
                <div className={styles.lessonItem}>
                  <h4>OCR is a Fallback</h4>
                  <p>Check native PDF text length first (&gt;300 chars). Skipping GPU OCR on native PDFs saves massive compute.</p>
                </div>
                <div className={styles.lessonItem}>
                  <h4>Pool the Engine</h4>
                  <p>PaddleOCR is not thread-safe. Initialize once in a locked queue pool to prevent GPU memory thrashing.</p>
                </div>
                <div className={styles.lessonItem}>
                  <h4>Coerce &amp; Standardize</h4>
                  <p>Never rely on LLMs for strict schema keys. Standardize aliases with Pydantic wrap validators before database insertion.</p>
                </div>
                <div className={styles.lessonItem}>
                  <h4>Decouple Extraction &amp; Evaluation</h4>
                  <p>Parsing facts and evaluating scores in separate passes prevents hallucinations from polluting structured candidate records.</p>
                </div>
              </div>
            </div>

            {/* Section Block - What's Next */}
            <section className={styles.sectionBlock}>
              <h2>What We Would Add Next</h2>
              <p>
                Future production enhancements include logging digital vs. OCR yield metrics to dynamically fine-tune the 300-character threshold, checking blank page confidence before invoking Gemini, and caching extracted raw text so schema updates can re-parse without re-running PaddleOCR.
              </p>
              <p>
                <strong>Closing:</strong> A production CV parser is not just PaddleOCR plus Gemini. It is a fast digital extract, a controlled Vietnamese OCR fallback, a constrained JSON taxonomy model, and a validation layer that turns unstructured résumés into reliable candidate data.
              </p>
            </section>

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
