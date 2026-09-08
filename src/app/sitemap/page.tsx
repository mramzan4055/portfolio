import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  Layers,
  Briefcase,
  Package,
  User,
  Mail,
  ArrowUpRight,
  FileCode,
  Sparkles,
  ExternalLink,
  Code2,
  CheckCircle2,
  Bot,
} from "lucide-react";
import { getProjects, getServices, getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactCTA } from "@/components/home/ContactCTA";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(
    {
      title: "HTML Sitemap & Navigation Index | M Ramzan",
      description:
        "Comprehensive directory of all pages, website development services, case studies, technology stacks, and website pricing packages on mramzan.dev.",
      keywords: [
        "M Ramzan Sitemap",
        "Website Directory Pakistan",
        "Web Developer Portfolio Index",
        "Website Packages Directory",
        "Case Studies Index",
      ],
      canonical: "/sitemap",
      type: "website",
    },
    settings
  );
}

export default async function SitemapPage() {
  const [projects, services, settings] = await Promise.all([
    getProjects({ status: "published" }),
    getServices(),
    getSiteSettings(),
  ]);

  const corePages = [
    {
      title: "Home",
      description: "Official portfolio overview, philosophy, featured highlights, and client FAQs.",
      href: "/",
      badge: "Main",
    },
    {
      title: "Work & Case Studies",
      description: "Verified showcase of live websites, WordPress portals, civic platforms, and Flutter apps.",
      href: "/work",
      badge: "Portfolio",
    },
    {
      title: "Services",
      description: "Full suite of web development, CMS customization, mobile apps, and SEO services.",
      href: "/services",
      badge: "Services",
    },
    {
      title: "Packages & Pricing",
      description: "Transparent website development tiers for Pakistani SMEs starting from PKR 30,000.",
      href: "/packages",
      badge: "Pricing",
    },
    {
      title: "About Me",
      description: "Professional background, verified technical stack, credentials, and work history.",
      href: "/about",
      badge: "Bio",
    },
    {
      title: "Contact & Hire",
      description: "Direct WhatsApp chat, project inquiry form, response time guarantee, and contact details.",
      href: "/contact",
      badge: "Inquiries",
    },
  ];

  return (
    <div className="pt-36 pb-28 min-h-screen">
      {/* Breadcrumbs Schema */}
      <JsonLd
        type="breadcrumbs"
        data={[
          { name: "Home", url: "/" },
          { name: "HTML Sitemap", url: "/sitemap" },
        ]}
        settings={settings}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#dfb15b]/30 w-fit">
            <Compass className="w-3.5 h-3.5 text-[#dfb15b]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Index & Directory
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight">
            Site Map & <span className="text-gradient-gold">Navigation Index</span>
          </h1>
          <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
            Explore the complete structure of <strong className="text-white font-medium">mramzan.dev</strong>. 
            All core pages, dedicated service capabilities, real case studies, and search engine endpoints indexed for direct access.
          </p>
        </div>

        {/* Machine Feeds Quick Bar */}
        <div className="glass-panel p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-white/[0.08]">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-[#dfb15b]" />
            <div>
              <p className="text-white text-sm font-semibold">Search Engine & AI Feed Endpoints</p>
              <p className="text-xs text-platinum-400 font-mono">Raw feeds consumed by Google, Bing, and AI crawler systems</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-[#dfb15b]/50 text-xs font-mono text-[#dfb15b] transition-all"
            >
              <span>XML Sitemap</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-[#dfb15b]/50 text-xs font-mono text-platinum-300 transition-all"
            >
              <span>robots.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-[#dfb15b]/50 text-xs font-mono text-platinum-300 transition-all"
            >
              <Bot className="w-3 h-3 text-[#dfb15b]" />
              <span>llms.txt (AI Context)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Section 1: Core Pages */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <Layers className="w-5 h-5 text-[#dfb15b]" />
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">
              Core Pages
            </h2>
            <span className="text-xs font-mono text-platinum-500">
              ({corePages.length} routes)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-4 group hover:border-[#dfb15b]/40 hover:-translate-y-1 transition-all"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#dfb15b] tracking-wider uppercase">
                      {page.badge}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-platinum-500 group-hover:text-[#dfb15b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white group-hover:text-gradient-gold transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-xs text-platinum-400 font-light leading-relaxed">
                    {page.description}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-platinum-500">
                  mramzan.dev{page.href}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 2: Dedicated Services */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <Code2 className="w-5 h-5 text-[#dfb15b]" />
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">
              Website & Mobile App Services
            </h2>
            <span className="text-xs font-mono text-platinum-500">
              ({services.length} specialized services)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-4 group hover:border-[#dfb15b]/40 hover:-translate-y-1 transition-all"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#dfb15b]">
                      {service.pricingStart || "From PKR 30,000"}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-platinum-500 group-hover:text-[#dfb15b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white group-hover:text-gradient-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-platinum-400 font-light leading-relaxed line-clamp-2">
                    {service.shortDescription || service.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-platinum-500 pt-2 border-t border-white/[0.04]">
                  <span>/services/{service.slug}</span>
                  <span className="text-[#dfb15b]">{service.turnaround || "7–14 days"}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 3: Published Case Studies */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <Briefcase className="w-5 h-5 text-[#dfb15b]" />
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">
              Projects & Case Studies
            </h2>
            <span className="text-xs font-mono text-platinum-500">
              ({projects.length} verified projects)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-4 group hover:border-[#dfb15b]/40 hover:-translate-y-1 transition-all"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#dfb15b]">
                      {project.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-platinum-500 group-hover:text-[#dfb15b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white group-hover:text-gradient-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-platinum-400 font-light leading-relaxed line-clamp-2">
                    {project.subtitle || project.shortDescription}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {(project.technologies || []).slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full bg-white/[0.04] text-[10px] font-mono text-platinum-400 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 4: Packages Quick Matrix */}
        {settings.packages && settings.packages.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
              <Package className="w-5 h-5 text-[#dfb15b]" />
              <h2 className="text-2xl font-display font-bold text-white tracking-tight">
                Website Development Packages
              </h2>
              <span className="text-xs font-mono text-platinum-500">
                (Fixed & Transparent Pricing)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {settings.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-4 border border-white/[0.06]"
                >
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-mono text-[#dfb15b] tracking-wider uppercase">
                      {pkg.priceNote} {pkg.price}
                    </span>
                    <h3 className="text-lg font-display font-semibold text-white">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-platinum-400 font-light leading-relaxed">
                      {pkg.description}
                    </p>
                    <ul className="flex flex-col gap-1.5 pt-2">
                      {(pkg.features || []).slice(0, 4).map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-platinum-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb15b] flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/packages"
                    className="text-xs font-mono text-[#dfb15b] hover:underline flex items-center gap-1 mt-2"
                  >
                    <span>View Package Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conversion CTA */}
        <ContactCTA settings={settings} />
      </div>
    </div>
  );
}
