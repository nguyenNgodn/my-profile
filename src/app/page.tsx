"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setFormSubmitted(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormSubmitted(false), 6000);
      } else {
        setErrorMessage(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setErrorMessage("Something went wrong. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* ==========================================
          HEADER BANNER / HERO SECTION
          ========================================== */}
      <div className={styles.heroShell}>
      <header className={styles.hero}>
        <div className={styles.topBar}>
          <div className={styles.brand}>Stylo CV</div>
          <nav className={styles.nav}>
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#experience" className={styles.navLink}>Experience</a>
            <a href="#articles" className={styles.navLink}>Articles</a>
            <a href="#certificate" className={styles.navLink}>Certificate</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </nav>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/images/Anh.jpeg"
              alt="Ngo Ngoc Nguyen Profile Photo"
              width={160}
              height={160}
              className={styles.avatar}
              priority
            />
          </div>
          <h1 className={styles.name}>Ngo Ngoc Nguyen</h1>
          <p className={styles.title}>Web Full Stack Developer</p>
          <div className={styles.ctaGroup}>
            <a href="#contact" className={styles.btnPrimary}>Hire Me</a>
            <a href="#experience" className={styles.btnSecondary}>Resume</a>
          </div>
        </div>

        {/* Social media icons overlapping the bottom of the header */}
        <div className={styles.socialGroup}>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/nguyen.ngo.297754"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="Facebook"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.017 1.792-4.683 4.533-4.683 1.312 0 2.686.235 2.686.235v2.973h-1.514c-1.491 0-1.956.93-1.956 1.885v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.1 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="GitHub"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@ngonguyen0529"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="TikTok"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
        </div>
      </header>
      </div>

      {/* ==========================================
          ABOUT & BASIC INFORMATION SECTION
          ========================================== */}
      <section id="about" className={styles.section}>
        <div className="container">
          <div className={styles.infoGrid}>
            
            {/* Left Column: About */}
            <div className={styles.aboutBox}>
              <h3>About Me</h3>
              <p className={styles.aboutText}>
                Hi, I'm <strong>Ngo Ngoc Nguyen</strong>. You can call me Stylo. 
                <br /> I'm a passionate <strong>Web Full Stack Developer</strong> based in Da Nang, Viet Nam.
              </p>
              <p className={styles.aboutText}>
                With <strong>{new Date().getFullYear() - 2024} years of experience</strong> in web development, I have hands-on skills in JavaScript (TypeScript), Python, Java, SQL, and Git. I have worked on real-world products spanning e-commerce platforms, AI-powered recruitment systems (LLM & RAG), and multi-country SaaS solutions.
              </p>
              <p className={styles.aboutText}>
                I am eager to keep learning and growing in full-stack and AI-integrated development, pushing the boundaries of what technology can achieve.
              </p>
              
              <div className={styles.techTags}>
                <span className={styles.tag}>React.js</span>
                <span className={styles.tag}>Next.js 14/15</span>
                <span className={styles.tag}>TypeScript</span>
                <span className={styles.tag}>Node.js</span>
                <span className={styles.tag}>FastAPI</span>
                <span className={styles.tag}>Django</span>
                <span className={styles.tag}>Spring Boot</span>
                <span className={styles.tag}>PostgreSQL</span>
                <span className={styles.tag}>LLM & RAG</span>
                <span className={styles.tag}>Elasticsearch</span>
                <span className={styles.tag}>Docker</span>
              </div>
            </div>

            {/* Right Column: Basic Information */}
            <div className={styles.basicBox}>
              <h3>Basic Information</h3>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Age</span>
                  <span className={styles.infoValue}>{new Date().getFullYear() - 2005}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoValue}>
                    <a href="mailto:ngonguyen295@gmail.com">ngonguyen295@gmail.com</a>
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Phone</span>
                  <span className={styles.infoValue}>0912167445</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Address</span>
                  <span className={styles.infoValue}>Da Nang, Viet Nam</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Hobbies</span>
                  <span className={styles.infoValue}>Football, Swimming, Trekking, Traveling</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          WORK EXPERIENCE SECTION
          ========================================== */}
      <section id="experience" className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Work Experience</h2>
          </div>
          
          <div className={styles.timeline}>
            
            {/* Experience 1: ShareCV */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineCard}>
                <div className={styles.timelineHeader}>
                  <div>
                    <h3 className={styles.jobTitle}>Full-stack Developer</h3>
                    <span className={styles.company}>ShareCV — Remote</span>
                  </div>
                  <span className={styles.duration}>Feb 2026 – Present</span>
                </div>
                <div className={styles.timelineContent}>
                  <p style={{ marginBottom: "1rem", color: "#fff", fontWeight: 500 }}>
                    Project: AI-powered Recruitment Platform
                  </p>
                  <ul>
                    <li>Developed ShareCV end-to-end using Next.js 14 (TypeScript) for frontend and FastAPI (Python) for backend, using PostgreSQL, Elasticsearch, Docker, and role-based workflows (Recruiters, Collaborators, Admins).</li>
                    <li>Built core frontend features including multi-step CV upload, candidate search & filtering, interview scheduling, point packages, VNPay, and dashboards using Material UI, Ant Design, and Redux Toolkit.</li>
                    <li>Implemented backend REST APIs, designed data models using SQLModel/SQLAlchemy, managed migrations with Alembic, and indexed CVs with Elasticsearch.</li>
                    <li>Built an LLM-powered CV/JD parsing pipeline using PaddleOCR, PyMuPDF, and Gemini 2.5 Flash with fallback logic and Regex-based JSON recovery.</li>
                    <li>Developed candidate search workflow: frontend JD upload, LLM parsing, Elasticsearch hybrid search (vector embeddings + keyword), Cross Encoder reranking, and dynamic constraint scoring.</li>
                    <li>Designed production RAG chatbot using LlamaIndex, ChromaDB, BGE-M3 embeddings, semantic chunking, Gemini grounded generation, PostgreSQL history, and floating ChatBox.</li>
                    <li>Optimized AI workloads with GPU OCR pools, lazy-loaded models, and database locking.</li>
                  </ul>
                  <div className={styles.techTags} style={{ marginTop: "1.25rem" }}>
                    <span className={styles.tag}>Next.js 14</span>
                    <span className={styles.tag}>TypeScript</span>
                    <span className={styles.tag}>FastAPI</span>
                    <span className={styles.tag}>PostgreSQL</span>
                    <span className={styles.tag}>Elasticsearch</span>
                    <span className={styles.tag}>Gemini 2.5</span>
                    <span className={styles.tag}>LlamaIndex</span>
                    <span className={styles.tag}>PaddleOCR</span>
                    <span className={styles.tag}>Docker</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience 2: maison21g.com */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineCard}>
                <div className={styles.timelineHeader}>
                  <div>
                    <h3 className={styles.jobTitle}>Full Stack Developer</h3>
                    <span className={styles.company}>maison21g.com — Remote</span>
                  </div>
                  <span className={styles.duration}>Apr 2025 – Jan 2026</span>
                </div>
                <div className={styles.timelineContent}>
                  <p style={{ marginBottom: "1rem", color: "#fff", fontWeight: 500 }}>
                    Project: Multi-country bespoke perfume E-commerce
                  </p>
                  <ul>
                    <li>Built and maintained multi-country e-commerce platform using Django, Django REST Framework, and Wagtail CMS, serving Singapore and the SEA region.</li>
                    <li>Developed configuration management supporting 20+ categories (perfumes, candles, diffusers) with scent selection, bottle personalization, and gift wrapping.</li>
                    <li>Developed interactive survey funnels (co-branded partnerships with Ferrari, McLaren, BMW) and a complete seminar booking system with payment/booking confirmation.</li>
                    <li>Integrated Stripe payment for conference bookings across multi-currency and multi-country environments.</li>
                    <li>Designed and implemented promotional tool for percentage/fixed discounts, promo codes, cart rules, and multi-currency pricing.</li>
                    <li>Packaged application using Docker and managed CI/CD pipelines.</li>
                  </ul>
                  <div className={styles.techTags} style={{ marginTop: "1.25rem" }}>
                    <span className={styles.tag}>Django</span>
                    <span className={styles.tag}>DRF</span>
                    <span className={styles.tag}>Wagtail CMS</span>
                    <span className={styles.tag}>Stripe</span>
                    <span className={styles.tag}>Docker</span>
                    <span className={styles.tag}>CI/CD</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          EDUCATION & CERTIFICATES SECTION
          ========================================== */}
      <section id="education" className={styles.section}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }}>
            
            {/* Education */}
            <div>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Education</h2>
              </div>
              <div className={styles.educationGrid}>
                <div className={styles.eduCard}>
                  <div className={styles.eduInfo}>
                    <h3>Information Technology</h3>
                    <p className={styles.institution}>College of Phuong Dong — Da Nang</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Major: Software Developer</p>
                  </div>
                  <span className={styles.eduYear}>2023 – 2025</span>
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div id="certificate">
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Certificates</h2>
              </div>
              <div className={styles.certGrid}>
                <div className={styles.certCard}>
                  <div className={styles.certIcon}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className={styles.certInfo}>
                    <h3>Fullstack Developer (Node.js)</h3>
                    <p className={styles.certIssuer}>IViettech Center, Da Nang</p>
                    <span className={styles.certDate}>2025</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          ARTICLES SECTION
          ========================================== */}
      <section id="articles" className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Articles</h2>
          </div>
          
          <div className={styles.articlesGrid}>
            
            {/* Article 1 */}
            <article className={styles.articleCard}>
              <div className={styles.articleImgPlaceholder}>
                <Image
                  src="/images/rag_chatbot_cover.jpg"
                  alt="Building a Production-Ready RAG Chatbot with Gemini 2.5 Flash"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.articleContent}>
                <span className={styles.articleMeta}>AI & Search</span>
                <h3 className={styles.articleTitle}>
                  <a href="/articles/building-rag-chatbot-gemini">Building a Production-Ready RAG Chatbot with Gemini 2.5 Flash</a>
                </h3>
                <p className={styles.articleDesc}>
                  Discover how to use LlamaIndex, ChromaDB, and BGE-M3 Vietnamese embeddings to build a semantic search chatbot with caching and citations.
                </p>
                <a href="/articles/building-rag-chatbot-gemini" className={styles.articleLink}>
                  Read Article
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>

            {/* Article 2 */}
            <article className={styles.articleCard}>
              <div className={styles.articleImgPlaceholder}>
                <Image
                  src="/images/cv_parsing_cover.jpg"
                  alt="CV Parsing Ingestion Pipeline using PaddleOCR and Google Gemini"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.articleContent}>
                <span className={styles.articleMeta}>LLM Pipeline</span>
                <h3 className={styles.articleTitle}>
                  <a href="/articles/cv-parsing-ingestion-pipeline">CV Parsing Ingestion Pipeline using PaddleOCR and Google Gemini</a>
                </h3>
                <p className={styles.articleDesc}>
                  A deep dive into parsing messy PDF/Image resumes at scale, using OCR pools, fallback schemas, and recovery of structured JSON content.
                </p>
                <a href="/articles/cv-parsing-ingestion-pipeline" className={styles.articleLink}>
                  Read Article
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>

            {/* Article 3 */}
            <article className={styles.articleCard}>
              <div className={styles.articleImgPlaceholder}>
                <Image
                  src="/images/stripe_ecommerce_cover.jpg"
                  alt="Building Custom Funnels & Multi-country Payments with Stripe"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.articleContent}>
                <span className={styles.articleMeta}>E-Commerce</span>
                <h3 className={styles.articleTitle}>
                  <a href="/articles/stripe-custom-funnels">Building Custom Funnels & Multi-country Payments with Stripe</a>
                </h3>
                <p className={styles.articleDesc}>
                  Best practices for configuring flexible product customizers and integrating Stripe across multi-currency and multi-country configurations.
                </p>
                <a href="/articles/stripe-custom-funnels" className={styles.articleLink}>
                  Read Article
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ==========================================
          CONTACT FORM SECTION
          ========================================== */}
      <section id="contact" className={styles.section} style={{ borderBottom: "none" }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Contact Me</h2>
          </div>

          <div className={styles.contactGrid}>
            
            {/* Contact Details */}
            <div className={styles.contactInfo}>
              <h3>Let's collaborate!</h3>
              <p className={styles.contactDesc}>
                I am currently open to remote full-time opportunities or freelance full-stack/AI projects. Feel free to reach out and let's build something great together.
              </p>
              
              <div className={styles.contactMethod}>
                <div className={styles.contactMethodIcon}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className={styles.contactMethodText}>
                  <h4>Email</h4>
                  <p>ngonguyen295@gmail.com</p>
                </div>
              </div>

              <div className={styles.contactMethod}>
                <div className={styles.contactMethodIcon}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className={styles.contactMethodText}>
                  <h4>Phone</h4>
                  <p>0912167445</p>
                </div>
              </div>

              <div className={styles.contactMethod}>
                <div className={styles.contactMethodIcon}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className={styles.contactMethodText}>
                  <h4>Location</h4>
                  <p>Da Nang, Viet Nam</p>
                </div>
              </div>
            </div>

            {/* Contact Form Box */}
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              {formSubmitted && (
                <div className={styles.successMessage}>
                  Thank you! Your message has been sent successfully to ngonguyen295@gmail.com.
                </div>
              )}

              {errorMessage && (
                <div className={styles.errorMessage}>
                  {errorMessage}
                </div>
              )}
              
              <div className={styles.formGroup}>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER
          ========================================== */}
      <footer className={styles.footer}>
        <div className="container">
          <p>© {new Date().getFullYear()} <span className={styles.footerHighlight}>Ngo Ngoc Nguyen</span>. All rights reserved.</p>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.2)" }}>
            Built with Next.js & Vanilla CSS. Inspired by professional developer aesthetics.
          </p>
        </div>
      </footer>
    </div>
  );
}
