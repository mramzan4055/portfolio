import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  Layers,
  LayoutDashboard,
  Sparkles,
  Wand2,
  Clock,
  Coins,
  Users,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Code2,
} from "lucide-react";
import { getServices, getServiceBySlug, getProjects, getSiteSettings } from "@/lib/data/store";
import { generateServiceMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
  ]);

  if (!service) return { title: "Service Not Found" };
  return generateServiceMetadata(service, settings);
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const [service, allServices, allProjects, settings] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getProjects({ status: "published" }),
    getSiteSettings(),
  ]);

  if (!service) {
    notFound();
  }

  // Find related real projects
  const relatedProjects = (service.relatedProjects || [])
    .map((s) => allProjects.find((p) => p.slug === s))
    .filter(Boolean);

  // Fallback to general published projects if none specifically tagged
  const fallbackProjects = relatedProjects.length > 0 
    ? relatedProjects.slice(0, 2)
    : allProjects.slice(0, 2);

  // Other services for internal linking
  const otherServices = allServices.filter((s) => s.slug !== service.slug);

  const waUrl =
    settings.whatsappEnabled && settings.whatsappNumber
      ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
          `Hi M Ramzan, I am interested in your "${service.title}" service. Can we discuss?`
        )}`
      : "/contact";

  return (
    <div className="pt-32 pb-24 min-h-screen">
      {/* Structured Data: Service, Breadcrumbs, FAQ */}
      <JsonLd type="service" data={service} settings={settings} />
      <JsonLd
        type="breadcrumbs"
        data={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.title, url: `/services/${service.slug}` },
        ]}
        settings={settings}
      />
      {service.faq && service.faq.length > 0 && (
        <JsonLd type="faq" data={service.faq} settings={settings} />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-platinum-400">
          <Link href="/" className="hover:text-[#dfb15b] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-platinum-600" />
          <Link href="/services" className="hover:text-[#dfb15b] transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3 h-3 text-platinum-600" />
          <span className="text-[#dfb15b] font-semibold">{service.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-[#dfb15b]/10 border border-[#dfb15b]/30 text-[#dfb15b] text-xs font-mono font-semibold uppercase tracking-wider">
                Service Overview
              </span>
              {service.turnaround && (
                <span className="flex items-center gap-1.5 text-xs font-mono text-platinum-400">
                  <Clock className="w-3.5 h-3.5 text-[#dfb15b]" />
                  <span>{service.turnaround}</span>
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
              {service.title}
            </h1>

            {service.heroTagline && (
              <p className="text-xl sm:text-2xl text-gradient-gold font-display font-medium leading-snug">
                {service.heroTagline}
              </p>
            )}

            <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
              {service.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider transition-all hover:shadow-gold hover:scale-[1.02] text-black"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", color: "white" }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-panel hover:border-[#dfb15b]/40 text-white font-medium text-sm uppercase tracking-wider transition-all"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Facts Sidebar Card */}
          <div className="lg:col-span-4 glass-panel-elevated p-8 rounded-3xl flex flex-col gap-6">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#dfb15b]">
              Service Overview & Pricing
            </h2>

            <div className="flex flex-col gap-4 text-xs font-mono text-platinum-300 border-t border-white/[0.08] pt-4">
              <div className="flex items-center justify-between">
                <span className="text-platinum-500">Starting Price:</span>
                <span className="text-white font-bold text-sm text-[#dfb15b]">
                  {service.pricingStart || "From PKR 30,000"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-platinum-500">Typical Turnaround:</span>
                <span className="text-white">{service.turnaround || "7–14 Days"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-platinum-500">Market Focus:</span>
                <span className="text-white">Pakistan SMEs & Global</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-platinum-500">Support:</span>
                <span className="text-emerald-400">Launch Walkthrough Included</span>
              </div>
            </div>

            {/* Tech Tags */}
            <div className="border-t border-white/[0.08] pt-4 flex flex-col gap-2">
              <span className="text-[11px] font-mono text-platinum-500 uppercase">
                Technologies Utilized
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(service.technologies || []).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-platinum-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Answer-First GEO Summary Callout (Crucial for AI search engines) */}
        {service.geoSummary && (
          <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-[#dfb15b] flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Quick Summary for Search & AI Engines
            </span>
            <p className="text-platinum-200 text-sm sm:text-base leading-relaxed font-light">
              {service.geoSummary}
            </p>
          </div>
        )}

        {/* Deliverables Checklist Grid */}
        <div className="flex flex-col gap-8 pt-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              What Is Included
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Standard Deliverables & Inclusions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl flex items-start gap-3.5 hover:border-[#dfb15b]/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-platinum-200 font-light leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience Section */}
        {service.targetAudience && service.targetAudience.length > 0 && (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                Who This Service Is Built For
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Ideal Clients & Industries
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.targetAudience.map((aud, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-3 text-xs sm:text-sm text-platinum-300 font-mono"
                >
                  <Users className="w-4 h-4 text-[#dfb15b] flex-shrink-0" />
                  <span>{aud}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step-by-Step Development Process Roadmap */}
        {service.processSteps && service.processSteps.length > 0 && (
          <div className="flex flex-col gap-8 pt-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                Development Roadmap
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Step-by-Step Execution Process
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.processSteps.map((s, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-7 rounded-2xl flex flex-col gap-3 relative"
                >
                  <span className="text-2xl font-mono font-bold text-gradient-gold">
                    {s.step}
                  </span>
                  <h3 className="text-base font-display font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="text-xs text-platinum-400 leading-relaxed font-light">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why Choose M Ramzan */}
        {service.whyChooseUs && service.whyChooseUs.length > 0 && (
          <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                The Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Why Work With Me on This Project?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.whyChooseUs.map((w, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-platinum-300 font-light leading-relaxed">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Real Case Studies */}
        {fallbackProjects.length > 0 && (
          <div className="flex flex-col gap-8 pt-8 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                  Proof of Work
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                  Relevant Case Studies
                </h2>
              </div>

              <Link
                href="/work"
                className="text-xs font-mono uppercase tracking-widest text-platinum-400 hover:text-[#dfb15b] flex items-center gap-1"
              >
                <span>View Full Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fallbackProjects.map((proj, idx) => (
                <ProjectCard key={proj!.id} project={proj!} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Dedicated Service FAQ Section */}
        {service.faq && service.faq.length > 0 && (
          <div className="flex flex-col gap-8 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                Frequently Answered Questions
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                {service.title} FAQs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.faq.map((faq, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-8 rounded-2xl flex flex-col gap-3 hover:border-[#dfb15b]/30 transition-colors"
                >
                  <div className="flex items-start gap-2.5 text-white font-display font-semibold text-base">
                    <HelpCircle className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-1" />
                    <span>{faq.question}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-platinum-400 font-light leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explore Other Services */}
        <div className="flex flex-col gap-6 pt-12 border-t border-white/[0.08]">
          <h3 className="text-xs font-mono uppercase tracking-widest text-platinum-400">
            Explore Other Development Services
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherServices.map((os) => (
              <Link
                key={os.id}
                href={`/services/${os.slug}`}
                className="p-4 rounded-xl glass-panel hover:border-[#dfb15b]/40 text-xs font-mono text-platinum-300 hover:text-white transition-all flex items-center justify-between group"
              >
                <span className="line-clamp-1">{os.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-platinum-500 group-hover:text-[#dfb15b] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Global Bottom CTA */}
      <div className="mt-20">
        <ContactCTA settings={settings} />
      </div>
    </div>
  );
}
