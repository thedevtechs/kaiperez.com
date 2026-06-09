"use client";

import { useState } from "react";
import { email } from "../lib/content";

export default function EmailButton({ label = email }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard?.writeText(email);
    } catch {
      // The mailto link remains available when clipboard access is blocked.
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button className="btn ghost" type="button" onClick={copyEmail}>
      <span className="mono">{copied ? "Copied" : label}</span>
    </button>
  );
}
