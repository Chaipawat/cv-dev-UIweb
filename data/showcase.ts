import { portfolio } from "@/data/portfolio";

export type EvidenceVariant = "panel" | "device" | "flow" | "abstract";

export interface Evidence {
  title: string;
  badge: string;
  desc: string;
  variant: EvidenceVariant;
  steps?: string[];
}

export type ShowcaseCategory = "Frontend" | "Mobile" | "Integration" | "Tools";

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = ["Frontend", "Mobile", "Integration", "Tools"];

function evidence(
  title: string,
  badge: string,
  desc: string,
  variant: EvidenceVariant = "abstract",
  steps?: string[]
): Evidence {
  return { title, badge, desc, variant, steps };
}

// Every technology below is backed by portfolio.skills or a project stack in
// data/portfolio.ts. Evidence items are generic technique descriptions, not
// specific project claims. This page is retired into /work in a later phase.
export const SHOWCASE_DATA: Record<ShowcaseCategory, Record<string, Evidence[]>> = {
  Frontend: {
    JavaScript: [
      evidence("Interaction Logic", "Component example", "Event-driven behaviour isolated from product code.", "panel"),
      evidence("Async Handling", "Abstract representation", "Loading, success, empty and error states as one contract."),
      evidence("Data Shaping", "Reconstructed UI", "Sorting, filtering and derived values in the view layer."),
    ],
    TypeScript: [
      evidence("Typed Component API", "Component example", "Props and variants described before they are built.", "panel"),
      evidence(
        "Safer Data Contracts",
        "Architecture diagram",
        "Backend response mapped to typed models the UI trusts.",
        "flow",
        ["API response", "Typed model", "Component props"]
      ),
      evidence("Refactor Confidence", "Abstract representation", "Type errors instead of runtime surprises."),
    ],
    React: [
      evidence("Responsive Interface", "Reconstructed UI", "One layout system from 375px to 1440px.", "panel"),
      evidence("Component System", "Component example", "Small, composable pieces with clear states."),
      evidence("State-driven UI", "Interaction demo", "Every visual state maps to a state value, not a guess."),
      evidence("Form Experience", "Reconstructed UI", "Validation, feedback and recovery paths.", "panel"),
      evidence("API-driven UI", "Abstract representation", "Fetch, cache, render, retry."),
    ],
    "Next.js": [
      evidence("Routing", "Architecture diagram", "Route structure that matches how people actually navigate.", "flow", [
        "Route",
        "Layout",
        "Page",
      ]),
      evidence("Application Structure", "Technology mapping", "Feature folders, shared UI, clear boundaries."),
      evidence("Data-driven Page", "Reconstructed UI", "Server data rendered into a stable page shell.", "panel"),
      evidence("Dashboard", "Sanitized layout", "Dense data laid out without visual noise.", "panel"),
      evidence("Integration UI", "Abstract representation", "Third-party services surfaced as native-feeling UI."),
    ],
    HTML: [
      evidence("Semantic Structure", "Component example", "Landmarks, headings and lists carrying real meaning."),
      evidence("Accessible Markup", "Interaction demo", "Labels, roles and focus order handled up front."),
      evidence("Form Semantics", "Reconstructed UI", "Native controls first, custom only when needed.", "panel"),
    ],
    CSS: [
      evidence("Design Tokens", "Technology mapping", "Color, spacing and radius as one shared scale."),
      evidence("Responsive Layout", "Reconstructed UI", "Grid and flex compositions that survive real content.", "panel"),
      evidence("Motion & States", "Interaction demo", "Hover, focus and transition timing as a system."),
    ],
  },
  Mobile: {
    "React Native": [
      evidence("Mobile Interface", "Device mockup", "Touch-first layout with native navigation patterns.", "device"),
      evidence("Cross-platform UI", "Abstract representation", "One codebase, two platform conventions respected."),
      evidence(
        "Navigation Flow",
        "Architecture diagram",
        "Stack and tab structure mapped before build.",
        "flow",
        ["Entry", "Stack", "Detail"]
      ),
    ],
    Android: [
      evidence("Build & Release", "Workflow diagram", "Debug build, signing, internal distribution.", "flow", [
        "Build",
        "Sign",
        "Distribute",
      ]),
      evidence("Permission Flow", "Device mockup", "Request, denial and recovery states designed together.", "device"),
    ],
    iOS: [
      evidence("Platform UI Parity", "Device mockup", "Same product, platform-correct details.", "device"),
      evidence("Gesture Handling", "Interaction demo", "Swipe, long press and scroll conflicts resolved."),
    ],
    "Vision Camera": [
      evidence("Camera Experience", "Device mockup", "Live preview, framing guide, capture feedback.", "device"),
      evidence("Scan Result UI", "Reconstructed UI", "Detection turned into a readable, actionable result.", "panel"),
    ],
  },
  Integration: {
    "REST API": [
      evidence("API Result UI", "Reconstructed UI", "Response mapped to list, detail and empty views.", "panel"),
      evidence("Error & Empty States", "Abstract representation", "Failure treated as a designed state."),
    ],
    "API Integration": [
      evidence("Request Lifecycle", "Workflow diagram", "From trigger to rendered state.", "flow", [
        "Request",
        "Response",
        "Frontend state",
      ]),
      evidence("Auth Flow", "Architecture diagram", "Token handling and protected routes.", "flow", [
        "Login",
        "Token",
        "Protected view",
      ]),
    ],
    "Payment Integration": [
      evidence("Payment Flow", "Workflow diagram", "Checkout steps with clear irreversible moments.", "flow", [
        "Cart",
        "Confirm",
        "Result",
      ]),
      evidence("Status Reconciliation", "Abstract representation", "Pending, success and failure kept honest in the UI."),
    ],
    "QR Payment": [
      evidence("QR Checkout", "Device mockup", "Generate, display, and confirm on one screen.", "device"),
      evidence("Expiry & Retry", "Interaction demo", "Countdown, expiry and regenerate handled gracefully."),
    ],
    "Socket Communication": [
      evidence("Realtime State", "Abstract representation", "Incoming events merged into local state without flicker."),
      evidence("Connection Status", "Interaction demo", "Connected, reconnecting and offline made visible."),
    ],
  },
  Tools: {
    Git: [
      evidence("Branch to Merge", "Workflow diagram", "How a change travels from local work to main.", "flow", [
        "Branch",
        "Commit",
        "Review",
        "Merge",
      ]),
    ],
    GitHub: [
      evidence("Change Tracking", "Workflow diagram", "Issues and pull requests as the record of work.", "flow", [
        "Issue",
        "Pull request",
        "Checks",
        "Release",
      ]),
    ],
    Postman: [
      evidence("Contract First", "Workflow diagram", "Verify the API before writing the interface.", "flow", [
        "Request",
        "Response",
        "Frontend state",
      ]),
    ],
    Figma: [
      evidence("Design to Code", "Workflow diagram", "Design decisions carried into components without drift.", "flow", [
        "Design",
        "Component",
        "Implementation",
      ]),
    ],
    "Android Studio": [
      evidence("Device Debugging", "Workflow diagram", "Reproduce, inspect and fix on real hardware.", "flow", [
        "Emulator",
        "Debug",
        "Build",
      ]),
    ],
  },
};

export const BEYOND_ENGINEERING = [
  "UI Implementation",
  "Responsive Design",
  "API Integration",
  "Debugging",
  "Git Workflow",
  "AI-assisted Development",
];

export const BEYOND_SOFT_SKILLS = portfolio.softSkills.map((s) => s.name);
