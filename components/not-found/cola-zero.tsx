/**
 * The "0" of the 404: a glass of cola over ice that pours itself once, then
 * keeps fizzing. Generic cola styling on purpose — no brand marks. Drawn at
 * digit height so it sits on the Anton baseline; the CSS lives in
 * globals.css under "404 cola glass". Decorative only.
 */
export default function ColaZero() {
  return (
    <span className="cola-zero" aria-hidden="true">
      <svg viewBox="0 0 100 150" className="block h-full w-full overflow-visible">
        <defs>
          <clipPath id="cola-zero-inside">
            <path d="M13 11 L87 11 L78 139 L22 139 Z" />
          </clipPath>
          <linearGradient id="cola-zero-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8a3f16" />
            <stop offset="0.35" stopColor="#5a2410" />
            <stop offset="1" stopColor="#2a0f07" />
          </linearGradient>
        </defs>

        {/* Pour stream: drawn under the liquid, so it disappears below the surface. */}
        <rect className="cola-zero-stream" x="46" y="-70" width="7" height="200" rx="3.5" fill="url(#cola-zero-liquid)" />

        {/* Straw, striped in the site's vermilion and paper. */}
        <g transform="rotate(14 66 70)">
          <rect x="62" y="-34" width="8" height="150" rx="2" fill="#e5482a" />
          <path d="M62 -34 L70 -26 M62 -18 L70 -10 M62 -2 L70 6 M62 14 L70 22" stroke="#f8f0dd" strokeWidth="4" />
        </g>

        <g clipPath="url(#cola-zero-inside)">
          <g className="cola-zero-fill">
            <rect x="0" y="40" width="100" height="114" fill="url(#cola-zero-liquid)" />
            {/* Ice: translucent cubes floating near the top. */}
            <g fill="#ffffff" fillOpacity="0.16" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.6">
              <rect x="22" y="48" width="23" height="21" rx="4" transform="rotate(-12 33 58)" />
              <rect x="48" y="44" width="25" height="22" rx="4" transform="rotate(9 60 55)" />
              <rect x="34" y="70" width="19" height="17" rx="3.5" transform="rotate(22 43 78)" />
            </g>
            {/* Fizz: many small bubbles, each looping on its own offset. */}
            {[
              [28, 0],
              [36, 0.6],
              [44, 1.3],
              [52, 0.3],
              [60, 1.9],
              [68, 0.9],
              [32, 2.4],
              [56, 2.8],
              [72, 1.6],
              [40, 3.1],
            ].map(([x, delay]) => (
              <circle
                key={`${x}-${delay}`}
                className="cola-zero-bubble"
                cx={x}
                cy="132"
                r="1.7"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
            {/* Thin tan fizz head. */}
            <rect x="0" y="33" width="100" height="9" fill="#c99a6e" />
            {[14, 24, 34, 44, 54, 64, 74, 84].map((x, i) => (
              <circle key={x} cx={x} cy={i % 2 ? 34 : 33} r={i % 2 ? 4 : 5} fill="#d8b089" />
            ))}
          </g>
        </g>

        {/* Glass: thick ink outline, a cold highlight and a heavy base. */}
        <path
          d="M9 6 L91 6 L81 144 L19 144 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <path d="M24 22 L20 112" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />
        <path d="M21 136 L79 136" stroke="currentColor" strokeWidth="9" />
      </svg>
    </span>
  );
}
