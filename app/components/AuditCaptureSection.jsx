"use client";

import { useState } from "react";
import { auditLead, email } from "../lib/content";
import { trackEvent } from "../lib/analytics";

function mailtoHref({ site, sender, bottleneck }) {
  const body = [
    "Site or store:",
    site,
    "",
    "Best email:",
    sender,
    "",
    "What needs work?",
    bottleneck || "Not sure yet.",
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(auditLead.subject)}&body=${encodeURIComponent(body)}`;
}

export default function AuditCaptureSection() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Send enough context to see whether this is a fit.");

  async function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const site = String(form.get("site") || "").trim();
    const sender = String(form.get("email") || "").trim();
    const bottleneck = String(form.get("bottleneck") || "").trim();
    const fallbackHref = mailtoHref({ site, sender, bottleneck });

    trackEvent("service_inquiry_submit", {
      has_site: Boolean(site),
      has_email: Boolean(sender),
      has_bottleneck: Boolean(bottleneck),
    });

    setStatus("submitting");
    setMessage("Sending the request...");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          site,
          email: sender,
          bottleneck,
          pageUri: window.location.href,
        }),
      });
      const data = await response.json();

      if (response.ok && data.ok) {
        trackEvent("service_inquiry_captured", {
          captured_by: data.capturedBy || "api",
        });
        setStatus("sent");
        setMessage("Inquiry received. Kai can review the context and follow up with the right next move.");
        event.currentTarget.reset();
        return;
      }

      if (data.fallback === "mailto") {
        trackEvent("service_inquiry_fallback", {
          reason: data.error || "capture_not_configured",
        });
        window.location.href = fallbackHref;
        setStatus("fallback");
        setMessage("Email draft opened. Send it over and Kai can review the project.");
        return;
      }

      setStatus("error");
      setMessage(data.error || "Something did not send. Try again or book a call.");
    } catch {
      trackEvent("service_inquiry_fallback", {
        reason: "network_error",
      });
      window.location.href = fallbackHref;
      setStatus("fallback");
      setMessage("Email draft opened. Send it over and Kai can review the project.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section className="section audit-section" id="inquiry">
      <div className="audit-card">
        <div className="audit-copy">
          <span className="sec-eyebrow mono">{auditLead.eyebrow}</span>
          <h2>{auditLead.title}</h2>
          <p>{auditLead.lede}</p>
          <div className="audit-bullets" aria-label="Service inquiry fit areas">
            {auditLead.bullets.map((bullet) => (
              <span key={bullet}>{bullet}</span>
            ))}
          </div>
        </div>

        <form className="audit-form" onSubmit={handleSubmit}>
          <label>
            <span className="mono">Website or store URL</span>
            <input name="site" type="url" placeholder="https://yourstore.com" required disabled={isSubmitting} />
          </label>
          <label>
            <span className="mono">Email</span>
            <input name="email" type="email" placeholder="you@company.com" required disabled={isSubmitting} />
          </label>
          <label>
            <span className="mono">What needs work?</span>
            <textarea
              name="bottleneck"
              rows="3"
              placeholder="Shopify cleanup, brand refresh, buildout, tracking, follow-up..."
              disabled={isSubmitting}
            />
          </label>
          <button className="btn primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : auditLead.cta}
          </button>
          <p className={`audit-note ${status !== "idle" ? `audit-note-${status}` : ""}`} aria-live="polite">
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
