import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Briefcase, Calendar, MapPin, Download, ShieldCheck } from "lucide-react";
import { getExperience, getSkills, getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SkillsMatrixVisualizer } from "@/components/about/SkillsMatrixVisualizer";
import { Avatar } from "@/components/common/Avatar";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(
    {
      title: "About — Engineering Leadership & Philosophy",
      description: "Biography, career milestones, technical philosophy, and entity knowledge graph of M Ramzan.",
      canonical: "/about",
    },
    settings
  );
}

export default async function AboutPage() {
  const [experience, skills, settings] = await Promise.all([
    getExperience(),
    getSkills(),
    getSiteSettings(),
  ]);

  return (
    <div className="pt-36 pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-20">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              About Me & Development Background
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight leading-tight">
              Building practical websites & mobile apps with <span className="text-gradient-gold">clean design & reliable code</span>.
            </h1>
            <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
              {settings.authorBio}
            </p>
            <p className="text-platinum-400 text-sm sm:text-base font-light leading-relaxed">
              I build modern websites and mobile applications using industry-standard technologies, frameworks, and reliable development tools. My core stack includes WordPress, React, Next.js, HTML5, CSS3, JavaScript, and Flutter. I focus on clean UI, mobile responsiveness, smooth user experiences, and straightforward content management for clients.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                prefetch={true}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#dfb15b] to-[#c7963b] text-black font-semibold text-xs uppercase tracking-widest hover:shadow-gold transition-all"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full glass-panel hover:border-white/20 text-platinum-300 hover:text-white text-xs font-mono transition-all"
              >
                <Download className="w-4 h-4 text-[#dfb15b]" />
                <span>Download CV / Resume</span>
              </a>
            </div>
          </div>

          {/* Right Entity Card */}
          <div className="lg:col-span-5 glass-panel-elevated p-8 sm:p-10 rounded-3xl flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Avatar size={56} className="w-14 h-14 rounded-2xl" ring />
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  {settings.authorName}
                </h3>
                <p className="text-xs text-[#dfb15b] font-mono">
                  {settings.authorTitle}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 pt-4 border-t border-white/[0.08] text-xs font-mono text-platinum-300">
              <div className="flex items-center justify-between">
                <span className="text-platinum-500">Location:</span>
                <span>{settings.authorLocation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-platinum-500">Availability:</span>
                <span className="text-emerald-400">{settings.availabilityStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-platinum-500">Core Stack:</span>
                <span>WordPress, React/Next.js, Flutter</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-platinum-500">Direct Contact:</span>
                <span className="text-white">{settings.authorEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Skills Matrix Visualizer */}
        <SkillsMatrixVisualizer categories={skills} />

        {/* Career Timeline & Experience */}
        <div className="flex flex-col gap-10 pt-16 border-t border-white/[0.08]">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Career Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Professional Experience & Leadership
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-white/[0.08]">
            {experience.map((exp) => (
              <div key={exp.id} className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#dfb15b] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </span>
                  <h3 className="text-xl font-display font-bold text-white">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-platinum-400 font-mono">
                    {exp.company} • {exp.location}
                  </span>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    {exp.description.map((desc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-platinum-300 font-light leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb15b] flex-shrink-0 mt-1" />
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-platinum-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <ContactCTA settings={settings} />
      </div>
    </div>
  );
}
