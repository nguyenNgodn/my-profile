import Link from "next/link";
import Image from "next/image";
import styles from "./article.module.css";

export const metadata = {
  title: "Building a Production-Ready RAG Chatbot with Gemini 2.5 Flash | Ngo Ngoc Nguyen",
  description: "A deep dive into building a production-ready RAG chatbot architecture with local Vietnamese embeddings (BGE-M3), ChromaDB vector store, LlamaIndex retrieval, and Gemini 2.5 Flash.",
};

export default function RagChatbotArticle() {
  return (
    <div className={styles.wrapper}>
      {/* Top Header Navigation */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link href="/" className={styles.backLink}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Portfolio
            </Link>
            <span className={styles.badge}>RAG / Chatbot / Gemini 2.5 Flash</span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContainer}>
            <div className={styles.metaRow}>
              <span className={styles.category}>AI & System Architecture</span>
              <span className={styles.dot}>•</span>
              <span className={styles.readTime}>10 min read</span>
              <span className={styles.dot}>•</span>
              <span className={styles.date}>ShareCV Technical Case Study</span>
            </div>
            
            <h1 className={styles.title}>
              Building a Production-Ready RAG Chatbot with Gemini 2.5 Flash
            </h1>
            
            <p className={styles.subtitle}>
              Why a simple LLM wrapper fails in production, and how ShareCV built a resilient, low-latency, and cost-effective RAG pipeline with local Vietnamese embeddings (BGE-M3), Chroma vector index, and Gemini response caching.
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

      {/* Main Article Content */}
      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.articleBody}>

            {/* Featured Image */}
            <div className={styles.imageContainer}>
              <Image
                src="/images/rag_chatbot_cover.jpg"
                alt="RAG AI Chatbot System Architecture"
                width={860}
                height={484}
                className={styles.articleCoverImage}
                priority
              />
              <span className={styles.imageCaption}>System Architecture: Query Processing, Local BGE-M3 Vietnamese Embeddings, Chroma DB Nodes, and Gemini 2.5 Flash Integration</span>
            </div>
            
            {/* Introductory Callout */}
            <div className={styles.introBox}>
              <h2>Why a Chatbot is Not Enough</h2>
              <p>
                A generic LLM can talk fluently about almost anything. That is exactly the problem. When users ask ShareCV about Terms of Service, collaborator payouts, or how sourcing works, a fluent guess is worse than a short honest answer. The assistant must stay grounded in documents we control, cite where the answer came from, survive API failures, and stay cheap enough to run on every chat message.
              </p>
              <p>
                This article walks through how ShareCV built that system: a production RAG chatbot with local Vietnamese embeddings, Chroma as the vector store, LlamaIndex for retrieval, and Gemini for generation. The design is small on purpose. Most of the reliability comes from what we refused to add.
              </p>
            </div>

            {/* Section 1 */}
            <section className={styles.sectionBlock}>
              <h2>What Production-Ready Actually Means</h2>
              <p>
                A demo RAG app retrieves a few chunks and prints a completion. A production chatbot also has to handle operational edge cases gracefully:
              </p>
              <ul className={styles.checkList}>
                <li>Answer only from the knowledge base, and say so when the corpus does not cover the question.</li>
                <li>Serve both logged-in users and anonymous visitors without mixing their conversations.</li>
                <li>Persist chat history across requests, then trim and expire it so it cannot grow forever.</li>
                <li>Survive a Gemini key quota hit without taking the whole chat box down.</li>
                <li>Re-ingest documents when ToS pages change, without serving stale vectors under a new embedding model.</li>
                <li>Keep the vector store off the public static path to prevent data leaks.</li>
                <li>Cache repeated questions so the same ToS query does not pay for embed + generate twice.</li>
              </ul>
            </section>

            {/* Architecture at a glance */}
            <section className={styles.sectionBlock}>
              <h2>Architecture at a Glance</h2>
              <p>Every user message follows a strict, predictable execution path:</p>
              
              <div className={styles.pipelineDiagram}>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>01</div>
                  <div className={styles.stepTitle}>User Message</div>
                  <div className={styles.stepDesc}>Persist to conversation history</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>02</div>
                  <div className={styles.stepTitle}>Vector Retrieval</div>
                  <div className={styles.stepDesc}>Top-k chunks from Chroma (BGE-M3 local)</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>03</div>
                  <div className={styles.stepTitle}>Prompt Assembly</div>
                  <div className={styles.stepDesc}>Context + recent history + query</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>04</div>
                  <div className={styles.stepTitle}>Gemini 2.5 Flash</div>
                  <div className={styles.stepDesc}>Key rotation + response cache</div>
                </div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}>
                  <div className={styles.stepNum}>05</div>
                  <div className={styles.stepTitle}>Response + Citation</div>
                  <div className={styles.stepDesc}>Return answer & sources, persist turn</div>
                </div>
              </div>

              <p className={styles.captionText}>
                The HTTP surface is a FastAPI router under <code>/ragchat</code>. Chat and history accept either a Bearer token or a <code>session_id</code>. Re-ingest and cache-clear require a secret header so they stay ops-only.
              </p>
            </section>

            {/* Detailed Points Grid */}
            <div className={styles.gridContainer}>
              
              {/* Point 1 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>01</span>
                  <h3>The Knowledge Base is Small & Intentional</h3>
                </div>
                <p>
                  The collection is not “the entire internet” and not even “the whole ShareCV website.” It is a curated set of sources, each with a logical key, an optional live URL, and a local markdown file:
                </p>
                <ul>
                  <li><strong>Collaborator & Recruiter Terms of Service:</strong> Scraped from live pages, stored locally as fallback.</li>
                  <li><strong>Profile, Proposal, Contractor, & FAQ:</strong> Hand-curated markdown files marked <code>local_only</code> so re-ingest never overwrites them with noisy HTML scrapes.</li>
                </ul>
                <p>
                  Legal pages change on the website and refresh from URL. Product explanations are written specifically for retrieval: short, structured, and free of nav chrome.
                </p>
              </div>

              {/* Point 2 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>02</span>
                  <h3>Ingest Once, Fingerprint Everything</h3>
                </div>
                <p>
                  Vectors live in a persistent Chroma directory next to the repo, not under <code>static/</code>. On startup, <code>ensure_index()</code> compares three stamps stored on the collection:
                </p>
                <div className={styles.codeSnippet}>
                  <code>1. The embedding model name (AITeamVN/Vietnamese_Embedding)</code>
                  <code>2. The chunking strategy configuration</code>
                  <code>3. SHA-256 fingerprint (source key + content hash)</code>
                </div>
                <p>
                  If all stamps match, ingest is skipped. If anything changed, the collection is deleted, rebuilt, and caches are cleared immediately.
                </p>
              </div>

              {/* Point 3 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>03</span>
                  <h3>Chunk at Topic Shifts, Not Token Lottery</h3>
                </div>
                <p>
                  Fixed-size chunking cuts in the middle of a clause. For Terms of Service, that is fatal: the model sees half a condition and invents the rest.
                </p>
                <p>
                  ShareCV uses <strong>semantic splitting</strong> first. Adjacent sentences are compared by embedding similarity; a boundary is cut only when the distance crosses a high percentile (topic shift). Downstream sentence splitters re-split only oversized chunks (1024 tokens, 50-token overlap).
                </p>
              </div>

              {/* Point 4 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>04</span>
                  <h3>Local Vietnamese Embeddings + Gemini 2.5</h3>
                </div>
                <p>
                  Retrieval and generation are different jobs. Retrieval uses <code>AITeamVN/Vietnamese_Embedding</code> (BGE-M3 based, 1024 dimensions) loaded once per process behind a lock (~2GB resident).
                </p>
                <p>
                  Vectors are L2-normalized for cosine ranking in Chroma. Local embeddings mean ingest is free, semantic chunking is free, and queries don&apos;t pay API roundtrips prior to generation. <strong>Gemini 2.5 Flash</strong> handles language and tone synthesis over retrieved clauses.
                </p>
              </div>

              {/* Point 5 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>05</span>
                  <h3>Retrieval is Boring on Purpose</h3>
                </div>
                <p>
                  At query time, the engine pulls top 5 similar chunks from Chroma. Hits are concatenated as context, and source URLs are deduplicated into clean citations.
                </p>
                <p>
                  There is <strong>no LLM router</strong> picking among sub-indexes. Role-specific ToS overlap is handled via metadata filtering (e.g. recruiter vs collaborator sources). If retrieval is empty, the engine returns &quot;No relevant context found&quot; and instructs the model to say so rather than improvising.
                </p>
              </div>

              {/* Point 6 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>06</span>
                  <h3>The Prompt is the Safety Layer</h3>
                </div>
                <p>
                  The generation prompt is a strict contract:
                </p>
                <ul>
                  <li>Today&apos;s date is injected to prevent date drift.</li>
                  <li>Context, recent history, and query are explicitly separated.</li>
                  <li>Facts must originate from retrieved context; otherwise answer with fallback & info@sharecv.vn.</li>
                  <li>Competitor names are never hallucinated; reply language matches user query.</li>
                </ul>
              </div>

              {/* Point 7 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>07</span>
                  <h3>Gemini Key Rotation & Fallbacks</h3>
                </div>
                <p>
                  API keys are shuffled and tried in order. One quota error uses the next key instead of crashing. Fallback error strings are <em>never written to the LLM cache</em> to avoid sticky outage responses.
                </p>
                <p>
                  Successful turns are cached with SHA-256 prompt hashes and short TTLs, serving burst ToS queries instantly.
                </p>
              </div>

              {/* Point 8 */}
              <div className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>08</span>
                  <h3>Database-backed Session Memory</h3>
                </div>
                <p>
                  Chat history lives in Postgres: authenticated users map to <code>user_id</code>, while guests map to <code>session_id</code>. Only the last 10 turns are injected into the prompt. The table caps at 20 turns and auto-cleans old threads.
                </p>
              </div>

            </div>

            {/* Summary Lessons Box */}
            <div className={styles.summaryBox}>
              <h2>Production Architecture Lessons</h2>
              <div className={styles.lessonsGrid}>
                <div className={styles.lessonItem}>
                  <h4>Keep Corpus Small</h4>
                  <p>5 curated docs beat a full-site web scrape. Footers and nav chrome rot retrieval accuracy.</p>
                </div>
                <div className={styles.lessonItem}>
                  <h4>Decouple Models</h4>
                  <p>Local embeddings make search and semantic splitting free. Reserve Gemini 2.5 Flash for user synthesis.</p>
                </div>
                <div className={styles.lessonItem}>
                  <h4>Fingerprint Indexes</h4>
                  <p>Model name + chunking + doc hash ensures zero stale vectors after ToS policy updates.</p>
                </div>
                <div className={styles.lessonItem}>
                  <h4>Avoid Unnecessary Routers</h4>
                  <p>Use metadata filters for user roles instead of extra LLM routing roundtrips.</p>
                </div>
              </div>
            </div>

            {/* What's Next & Closing */}
            <section className={styles.sectionBlock}>
              <h2>What We Would Add Next</h2>
              <p>
                The next production wins are score-threshold scope gates: short-circuiting Gemini entirely when the top retrieval chunk similarity is below a calibrated threshold. Logging top retrieval scores in production over time will help calibrate this floor accurately.
              </p>
              <p>
                <strong>Closing:</strong> A production RAG chatbot is not a bigger prompt and a bigger index. It is a short, owned corpus, embeddings tuned to your users&apos; language, a generator restrained from inventing policy, and robust operational safeguards (keys, caches, fingerprints, isolated stores).
              </p>
            </section>

            {/* Footer Article Link */}
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
