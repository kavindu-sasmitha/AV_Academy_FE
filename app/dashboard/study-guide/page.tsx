"use client";

import { Download } from "lucide-react";

// public/study-guide.pdf - drop your PDF into the public/ folder with this exact name
// (or change PDF_URL below to point at an externally hosted file)
const PDF_URL = "/study-guide.pdf";

export default function StudyGuidePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">AV Academy — Study guide</h1>
      <p className="mt-1 text-sm text-mist">Read your theory book and course guidelines.</p>

      <div className="mt-8 flex h-auto flex-col overflow-hidden rounded-2xl border border-line/60 bg-surface md:h-[75vh]">
        <div className="flex shrink-0 flex-col gap-3 border-b border-line/60 bg-surface2/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 text-xs font-semibold text-chalk">
            <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
            AV Academy Study Guide (PDF)
          </span>
          <a
            href={PDF_URL}
            download="AV_Academy_Study_Guide.pdf"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-teal px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-void sm:w-auto"
          >
            <Download size={14} />
            Download PDF
          </a>
        </div>

        <div className="flex min-h-[350px] flex-1 flex-col bg-void/40 md:min-h-0">
          {/* Mobile: browsers block embedded PDF viewing, so offer a direct open/download link */}
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center md:hidden">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal/20 bg-teal/10 text-teal">
              <Download size={28} />
            </div>
            <h4 className="font-display text-sm font-semibold">Read on your mobile device</h4>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-mist">
              Mobile browsers restrict embedded PDF viewing. Tap below to download or view
              full-screen safely.
            </p>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3 text-xs font-bold uppercase tracking-wide text-void"
            >
              Open full book ↗
            </a>
          </div>

          {/* Desktop: embedded PDF frame */}
          <div className="hidden h-full flex-1 md:block">
            <iframe
              src={`${PDF_URL}#toolbar=1`}
              className="h-full w-full border-none"
              title="AV Academy Study Guide"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
