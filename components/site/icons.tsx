// Inline stroke icons shared across the site. All decorative: callers supply the accessible text.

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={size > 16 ? 1.4 : 1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DiagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HandArrow({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" aria-hidden="true" className={className} style={style}>
      <path d="M70 6C52 4 30 12 24 30c-3 9 0 18 8 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M24 44l8 8 9-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const S = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5" {...S} />
    </svg>
  );
}

export function MobileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6.5" y="2.5" width="11" height="19" rx="3" {...S} />
      <path d="M10.5 18.5h3" {...S} />
    </svg>
  );
}

export function PlugIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4" {...S} />
    </svg>
  );
}

export function FlowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="2.5" {...S} />
      <circle cx="18" cy="18" r="2.5" {...S} />
      <path d="M8.5 6H14a3 3 0 0 1 3 3v6.5" {...S} />
    </svg>
  );
}

export function CapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m2 9 10-5 10 5-10 5L2 9Z" {...S} />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" {...S} />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" {...S} />
      <path d="m4 7 8 6 8-6" {...S} />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" {...S} />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 7a1.97 1.97 0 0 0 0-4ZM20.44 13.2c0-3.1-1.66-4.95-4.32-4.95-1.6 0-2.62.78-3.06 1.5V8.5H9.7V20h3.37v-6.1c0-1.6.6-2.66 2-2.66 1.36 0 1.98.98 1.98 2.66V20h3.39v-6.8Z" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
