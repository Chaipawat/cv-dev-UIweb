You are redesigning an existing personal portfolio website for:

Chaipawat Jatuphattaranun (Ryu)

The goal is to transform the current dark editorial portfolio into a more experimental, premium, motion-driven portfolio using:

Kinetic Typography
Experimental Editorial Layout
Scrollytelling
Three.js / WebGL
Real Project Screenshots
Asymmetrical Composition
Editorial Motion

The redesign must remain professional and usable for recruiters and hiring managers.

Do not turn the site into an art-only experience.

The final portfolio should clearly communicate that Ryu is a frontend-focused Software Developer with real experience building web, mobile, admin, LINE LIFF, booking, payment, and product interfaces.

==================================================
CURRENT PROJECT CONTEXT
==================================================

Current stack:

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- Framer Motion
- Radix Dialog
- lucide-react

Current project type:

- Static portfolio
- No API
- No database
- No form backend
- Content mostly stored in data files

Current routes:

app/layout.tsx
├── /
├── /showcase
├── /work
├── /about
└── /contact

Current shared systems:

- Navbar
- MobileNav
- Footer
- PageContainer
- SectionLabel
- EditorialButton
- ProjectPreview
- Reveal
- MotionProvider

Current visual style:

- dark editorial
- oversized uppercase headings
- mono metadata labels
- thin borders
- dot-grid background
- minimal cards
- blue accent
- dark-only theme

Current design tokens:

Background:
#050505

Surface:
#0a0a0a
#111111

Borders:
#242424
#3a3a3a

Text:
#f5f5f2
#9a9a96
#7a7a76

Accent:
#7c9cff

Secondary accent:
#d7ff4f

Fonts:
- Geist
- Inter
- Geist Mono
- Instrument Serif Italic

Current animation timing:
180ms
320ms
550ms

Current easing:
cubic-bezier(0.22, 1, 0.36, 1)

Current MotionProvider already supports prefers-reduced-motion.
Preserve this behavior.

==================================================
REDESIGN DIRECTION
==================================================

Style:

Kinetic Typography / Experimental Editorial

Mood:

- Avant-garde
- Expressive
- Immersive
- Technical
- Editorial
- Premium
- Dark
- Motion-driven

Visual language:

- Giant typography
- Typography stretching and compression
- Scroll velocity reactions
- Motion blur
- Asymmetrical layouts
- Editorial compositions
- WebGL image deformation
- Clip-path transitions
- Marquee
- Custom cursor interactions
- Thin borders
- Mono labels
- Real product screenshots
- Layered browser/device compositions

Avoid:

- conventional SaaS cards
- centered generic heroes
- predictable feature grids
- glassmorphism
- excessive gradients
- generic dashboard templates
- excessive rounded cards
- decorative 3D objects with no relationship to the portfolio
- raw screenshot dumps
- excessive motion that hurts readability

Typography should be the primary visual element.

Three.js should enhance the experience, not become the content.

==================================================
CORE DESIGN PRINCIPLE
==================================================

The redesign should feel like:

Experimental creative portfolio
+
Real software engineering work
+
Clear professional credibility

The user should immediately understand:

- who Ryu is
- what type of developer he is
- what products he worked on
- what he contributed
- what technologies he used
- how to contact him

==================================================
PROFESSIONAL POSITIONING
==================================================

Use this positioning consistently:

Frontend-focused Software Developer

Do not position him as a senior engineer, technical lead, architect, or full-stack engineer unless the actual content explicitly supports it.

Professional summary:

Software Developer with 4+ years of professional experience developing web and mobile applications, primarily focused on front-end development.

Experience includes:

- responsive UI development
- React
- Next.js
- React Native
- JavaScript
- TypeScript
- REST API integration
- UI/UX feedback
- testing
- debugging
- production issue fixing
- mobile development
- LINE LIFF
- payment flows
- booking systems
- AI-assisted development

Typical team structure:

- 1 Frontend Developer
- 1 Backend Developer
- 1 Manager

Ryu usually handled the front-end side of the product, including:

- discussing requirements
- implementing UI
- responsive layouts
- API integration
- UI/UX feedback
- application states
- testing user flows
- bug fixing
- feature improvements

He sometimes reads backend Node.js code to understand API flow and debug integration issues, but backend development is not his primary responsibility.

==================================================
PHASE 0 — DATA CLEANUP
==================================================

Before redesigning UI, clean up the data architecture.

Current issue:

Portfolio information is duplicated across:

- data/portfolio.ts
- data/timeline.ts
- data/showcase.ts
- components/home/selected-work.tsx
- components/home/what-i-bring.tsx
- other hardcoded component content

This causes inconsistent project names, stacks, and descriptions.

Example inconsistency:

Broadpang Extension must use:

JavaScript
HTML
CSS

NOT Java.

Refactor the data system so that:

data/portfolio.ts

becomes the canonical source of truth.

Suggested structure:

export const portfolio = {
  profile,
  experience,
  education,
  skills,
  projects,
  contact
}

Other data files should derive information from portfolio.ts instead of duplicating it.

Example:

timeline.ts
should map from portfolio.experience

showcase/work views
should map from portfolio.projects

technical skills
should map from portfolio.skills

Do not duplicate project stacks manually in components.

==================================================
PROJECT DATA MODEL
==================================================

Create a structured Project model.

Suggested type:

type Project = {
  slug: string
  title: string
  shortTitle?: string

  year: string
  type: string

  description: string

  role: string

  team?: {
    frontend?: number
    backend?: number
    manager?: number
  }

  responsibilities: string[]

  features?: string[]

  stack: string[]

  featured: boolean

  confidentiality?: {
    publicDetails: boolean
    note?: string
  }

  images: {
    cover?: string
    gallery: ProjectImage[]
  }
}

type ProjectImage = {
  src: string
  alt: string

  category:
    | "web"
    | "mobile"
    | "admin"
    | "extension"
    | "flow"
    | "detail"

  caption?: string

  treatment?:
    | "full"
    | "browser"
    | "phone"
    | "crop"
    | "layered"
}

==================================================
REAL PROJECTS
==================================================

Use these projects as the current project list.

Do not invent additional professional projects.

1. Badminton Booking

Type:
LINE LIFF / Web Application / Admin

Role:
Frontend Developer

Main work:

- customer-facing LINE LIFF interface
- admin interface
- responsive mobile-first booking flow
- court selection
- time-slot selection
- booking flow
- membership
- package flow
- payment-related UI
- QR payment
- booking status
- payment status
- booking history
- API integration
- UI/UX feedback
- testing
- frontend bug fixing
- integration debugging

Stack:

- React
- Next.js
- JavaScript
- TypeScript
- REST API
- LINE LIFF
- Figma
- AI-assisted development

Backend familiarity:
Node.js code reading for API/integration debugging

This should be one of the strongest featured projects.

--------------------------------------------------

2. Zonepang Platform

Type:
Web Platform

Role:
Frontend Developer

Main work:

- major user-facing interfaces
- responsive web
- Figma implementation
- UI structure
- UX feedback
- REST API integration
- forms
- tables
- dashboards
- cards
- filters
- pagination
- management UI
- loading states
- empty states
- error states
- validation
- complex interactive UI
- flow-based interfaces
- testing
- frontend bug fixing

Stack:

- React
- Next.js
- JavaScript
- TypeScript
- REST API
- Postman
- Figma

Backend familiarity:
Node.js

--------------------------------------------------

3. Zonepang Admin

Type:
Admin / Back-office

Role:
Frontend Developer

Main work:

- dashboards
- tables
- forms
- filters
- management screens
- responsive layouts
- REST API integration
- loading/error/empty states
- UI/UX discussion
- bug fixing
- internal user feedback iteration

Stack:

- React
- Next.js
- JavaScript
- TypeScript
- REST API

--------------------------------------------------

4. Kumtone

Type:
Mobile Photography Application

Role:
Frontend Developer

Main work:

- React Native UI
- mobile user flows
- camera-related interfaces
- film-style camera selection
- REST API integration
- Android Studio
- mobile testing
- UI bug fixing
- Android/iOS release support
- subscription flows
- in-app purchase flows
- RevenueCat
- Google Play Billing
- Apple App Store purchase flow

Stack:

- React Native
- TypeScript
- REST API
- Android Studio
- react-native-vision-camera
- RevenueCat
- Google Play Billing
- Apple App Store

--------------------------------------------------

5. Offline Mini Game App

Type:
Offline Mobile Application

Role:
Frontend Developer

Main work:

- React Native UI
- game screens
- user interactions
- card drawing mechanics
- bottle spinning
- randomized game mechanics
- responsive mobile layout
- testing
- UI/interaction bug fixing
- AdMob integration
- application build/release preparation

Core game does not use external APIs or backend services.

Stack:

- React Native
- TypeScript
- Android Studio
- AdMob

--------------------------------------------------

6. Broadpang Extension

Type:
Chrome Extension

Role:
Frontend Developer / Maintenance

Context:

Originally developed by an outsourced team and later transferred to the internal team.

Main work:

- studying an existing legacy codebase
- JavaScript
- HTML
- CSS
- tracing existing functions
- understanding application flow
- working with minified/protected legacy code
- UI maintenance
- bug fixing
- reorganizing parts of frontend code
- continued internal development

Stack:

- JavaScript
- HTML
- CSS
- Chrome Extension

Do not use Java here.

--------------------------------------------------

7. Broadpang Web

Type:
Web Application

Role:
Frontend Developer

Main work:

- main user-facing interfaces
- early React work
- reusable components
- responsive layouts
- REST API integration
- UI/product discussions
- bug fixing
- iterative improvements

Stack:

- React
- JavaScript
- HTML
- CSS
- REST API

--------------------------------------------------

8. DevPath

Type:
Personal Learning Web Application

Role:
Personal Project

Main work:

- web UI
- information architecture
- technical learning content
- responsive navigation
- React/Next.js development
- AI-assisted research
- implementation support
- debugging
- refactoring

Stack:

- React
- Next.js
- JavaScript
- TypeScript
- AI-assisted development

==================================================
NEW SITEMAP
==================================================

Simplify the information architecture.

Recommended routes:

/
Home

/work
Project archive / selected work

/work/[slug]
Project case study

/about
Profile / experience / skills / process

/contact
Contact

/showcase
Remove or redirect to /work.

Do not keep Showcase as a separate technology-driven page unless there is a strong reason.

Projects should be the primary evidence of skills.

==================================================
HOME PAGE
==================================================

Redesign the homepage completely.

Do not use the current conventional hero + equal cards layout.

--------------------------------------------------
SECTION 1 — HERO
--------------------------------------------------

Use giant kinetic typography.

Suggested content:

SOFTWARE
DEVELOPER

(RYU)

Frontend-focused
Web / Mobile / Product Interfaces

4+ Years
Chonburi, Thailand
Available for opportunities

Use asymmetrical composition.

Do not center the entire hero.

Use typography as the dominant visual element.

Three.js / WebGL:

Create one meaningful WebGL visual.

Preferred concept:

A distorted image plane using either:

- project screenshot
- portrait
- project collage

Behavior:

- subtle cursor interaction
- image distortion
- scroll velocity deformation
- slight depth movement
- smooth return when interaction stops

Do not place random 3D spheres or decorative models unless they have a strong visual purpose.

--------------------------------------------------
SECTION 2 — KINETIC STATEMENT
--------------------------------------------------

Create a scroll-driven statement section.

Suggested copy:

I BUILD
INTERFACES
FOR REAL
PRODUCTS.

Supporting copy:

Frontend-focused Software Developer working across web, mobile, LINE LIFF, admin systems, booking flows, payments, and product interfaces.

Animation ideas:

- stretch text horizontally based on scroll velocity
- blur during fast scrolling
- serif contrast for one keyword
- marquee for selected phrases
- clip reveal

Motion should feel editorial, not playful.

--------------------------------------------------
SECTION 3 — SELECTED WORK
--------------------------------------------------

This is the most important redesign.

Remove the current code-drawn ProjectPreview mock UI for projects that now have real screenshots.

Feature:

1. Badminton Booking
2. Zonepang
3. Kumtone
4. Broadpang Extension
5. Mini Game
6. DevPath

Use editorial layouts instead of equal cards.

Suggested layout rhythm:

Project 01:
full-width hero composition

Project 02:
large asymmetric composition

Project 03:
mobile-focused composition

Project 04:
browser/extension composition

Project 05:
small visual composition

Project 06:
personal project composition

Each project should feel different visually while keeping consistent metadata structure.

Do not create six identical card components.

--------------------------------------------------
PROJECT IMAGE PRESENTATION
--------------------------------------------------

Never render screenshots as a simple raw gallery.

Create reusable treatments:

BrowserFrame
PhoneFrame
FullBleedProjectImage
LayeredProjectScreens
CroppedDetail
DistortedProjectImage

Use:

- real screenshots
- cropped sections
- layered compositions
- device mockups
- browser frames
- annotations
- short captions

Example Badminton composition:

large Admin screenshot
+
floating LINE LIFF phone screens

Metadata:

BADMINTON BOOKING
LINE LIFF / BOOKING PLATFORM
2025—2026

Role:
Frontend Developer

Focus:
Booking
Membership
Payment
Admin

Stack:
React
Next.js
TypeScript
LINE LIFF
REST API

--------------------------------------------------
SECTION 4 — PROJECT INDEX
--------------------------------------------------

After selected visual projects, add a minimal text-based project index.

Example:

01  Badminton Booking        LINE LIFF        2025—2026
02  Zonepang Platform        Web Platform     2024—2026
03  Kumtone                  Mobile App       2025—2026
04  Broadpang Extension      Extension        2022—2023
05  Mini Game                Mobile App       2025—2026
06  DevPath                  Personal         2026—

On hover:

- show floating project preview
- subtle image tilt
- optional WebGL distortion
- cursor-follow behavior on desktop only

Keep it readable.

--------------------------------------------------
SECTION 5 — EXPERIENCE PROGRESSION
--------------------------------------------------

Show career progression visually.

Use a condensed timeline such as:

Legacy Extension
→ React Web
→ Next.js Platform
→ React Native
→ LINE LIFF

Possible typography:

2022
BROADPANG EXTENSION

2023
REACT WEB

2024
ZONEPANG

2025
REACT NATIVE

2025—2026
LINE LIFF / PRODUCT SYSTEMS

The purpose is to show growth in scope and technology.

--------------------------------------------------
SECTION 6 — CAPABILITIES
--------------------------------------------------

Replace card-heavy skills UI.

Use typography-first capability blocks.

Example:

FRONTEND
React
Next.js
TypeScript
Responsive UI

MOBILE
React Native
Android Studio
RevenueCat
App Store / Google Play

INTEGRATION
REST API
LINE LIFF
Payments
QR Payment
Socket Status

WORKFLOW
Figma
UI/UX Feedback
Testing
Debugging
Bug Fixing

BACKEND FAMILIARITY
Node.js
API flow
request/response
integration debugging

Do not overstate backend experience.

--------------------------------------------------
SECTION 7 — ABOUT PREVIEW
--------------------------------------------------

Use portrait with editorial image treatment.

Possible treatments:

- image crop
- subtle WebGL displacement
- monochrome
- blue highlight
- halftone
- masked reveal

Use short text only.

Link to /about.

--------------------------------------------------
SECTION 8 — CONTACT CTA
--------------------------------------------------

Use large typography.

Example:

LET'S
BUILD
SOMETHING.

Email →
LinkedIn →
GitHub →

Optional footer marquee:

AVAILABLE FOR
FRONTEND
SOFTWARE DEVELOPMENT
PRODUCT WORK

==================================================
WORK PAGE
==================================================

Redesign /work as a project archive.

Do not use the same large generic hero as every other page.

Suggested opening:

WORK / 2022—2026

REAL PRODUCTS
WEB / MOBILE / LIFF / EXTENSION

Add filters:

ALL
WEB
MOBILE
LIFF
EXTENSION
PERSONAL

Do not use large SaaS-style pill controls.

Use simple editorial text navigation.

Project list:

- text-first
- hover preview
- year
- type
- title
- arrow
- project count

Click project to open:

/work/[slug]

==================================================
PROJECT DETAIL PAGE
==================================================

Create a reusable dynamic route:

app/work/[slug]/page.tsx

Build the page from portfolio.ts project data.

Suggested structure:

1. Project Hero
2. Project Metadata
3. Summary
4. Role / Team
5. What I Worked On
6. Feature Highlights
7. Visual Screens
8. Tech Stack
9. Next Project

--------------------------------------------------
PROJECT HERO
--------------------------------------------------

Example:

BADMINTON
BOOKING

LINE LIFF / WEB APPLICATION
2025—2026

Use real project images.

Do not use generic mock UI.

--------------------------------------------------
PROJECT METADATA
--------------------------------------------------

Example:

Role:
Frontend Developer

Team:
1 Frontend
1 Backend
1 Manager

Platform:
LINE LIFF
Admin Web

Contribution:
UI Implementation
Responsive Design
API Integration
UX Feedback
Testing
Bug Fixing

Stack:
React
Next.js
TypeScript
LINE LIFF
REST API

--------------------------------------------------
PROJECT VISUAL STORY
--------------------------------------------------

Break screenshots into groups.

Example:

01 — BOOKING FLOW

Court Selection
Time Slot
Confirmation

02 — MEMBERSHIP + PAYMENT

Package
Membership
QR Payment
Status

03 — ADMIN

Dashboard
Bookings
Members
Payments

Do not show 15 screenshots as a plain grid.

Use curated groups.

==================================================
ABOUT PAGE
==================================================

Redesign /about so it does not look like Home with another hero.

Suggested sections:

1. Profile introduction
2. Background / education
3. Work approach
4. Skills
5. AI-assisted workflow
6. Experience timeline

Work approach:

Understand
Design
Build
Refine

Keep the current concept if useful, but redesign the visual treatment to match the new editorial direction.

AI tools:

ChatGPT
Claude Code
Gemini

Describe them as supporting tools for:

- research
- implementation support
- debugging
- refactoring
- documentation
- UI development

Do not imply AI replaces engineering judgment.

==================================================
CONTACT PAGE
==================================================

Make this minimal.

Use giant typography.

Example:

LET'S TALK.

Email
Phone
LinkedIn
GitHub

Keep:

"Need a developer? Let's talk before happy hour."

if it still matches the tone.

Use subtle motion only.

==================================================
NAVIGATION
==================================================

Redesign Navbar.

Desktop options:

Option:
minimal top navigation

Brand left:
Chaipawat Jatuphattaranun (Ryu)

Navigation:
Work
About
Contact

Alternative:
menu trigger opening a full-screen editorial navigation.

Avoid making navigation confusing.

Mobile:

Keep Radix Dialog drawer if useful.

Redesign it visually.

==================================================
INTERNAL LINKS
==================================================

Replace internal <a> links with next/link where appropriate.

Do not trigger full page reload for internal navigation.

==================================================
IMAGE ASSET SYSTEM
==================================================

Use project assets from:

/public/projects/

Recommended structure:

/public/projects/
  badminton-booking/
    cover/
    admin/
    liff/
    details/

  zonepang/
    cover/
    dashboard/
    features/

  kumtone/
    cover/
    mobile/

  minigame/
    cover/
    mobile/

  broadpang-extension/
    cover/
    extension/

  devpath/
    cover/
    web/

Images may currently be basic screenshots.

Do not reject them because they are simple screenshots.

Transform them through layout, framing, cropping, masking, and motion.

==================================================
CONFIDENTIALITY
==================================================

Some projects are company projects.

Do not expose sensitive data.

If screenshots contain:

- customer name
- phone number
- email
- private IDs
- tokens
- user data
- confidential financial values

use sanitized versions.

Possible techniques:

- crop
- blur
- replace values
- mask confidential content

Preserve the real UI while hiding sensitive data.

==================================================
MOTION SYSTEM
==================================================

Keep Framer Motion for:

- component state animation
- menu
- UI transition
- simple reveal
- page transitions

Add:

GSAP
ScrollTrigger

Use for:

- kinetic typography
- scroll velocity effects
- pinning
- marquee
- large editorial transitions
- section choreography

Add:

Lenis

Use for:
smooth scrolling

Add:

Three.js
React Three Fiber
Drei

Use for:

- hero WebGL visual
- distorted images
- project hover previews
- image displacement
- subtle parallax depth

Responsibility separation:

Framer Motion
→ UI

GSAP
→ scrollytelling

Lenis
→ scroll behavior

React Three Fiber
→ WebGL

Do not animate the same element simultaneously with multiple animation systems.

==================================================
THREE.JS ARCHITECTURE
==================================================

Create isolated WebGL components.

Suggested structure:

components/
  webgl/
    HeroScene.tsx
    DistortedImage.tsx
    ProjectHoverPreview.tsx
    shaders/

Do not make the entire application depend on WebGL.

Content must still work if:

- WebGL fails
- reduced motion is enabled
- mobile performance is limited

Prefer progressive enhancement.

==================================================
THREE.JS HERO
==================================================

Preferred hero idea:

Distorted Project Plane

Input:

a project screenshot, portrait, or project collage

Interaction:

- cursor movement shifts distortion
- scroll velocity changes bend/blur
- slight z-depth
- subtle noise displacement
- idle state remains readable

Do not create a heavy game-like 3D scene.

==================================================
KINETIC TYPOGRAPHY
==================================================

Typography must be a major interaction system.

Use:

- stretch
- squash
- translate
- skew
- blur
- clipping
- perspective
- marquee
- velocity response

Do not make every heading animate identically.

Use different animation behavior depending on section context.

Keep body copy readable.

==================================================
CUSTOM CURSOR
==================================================

Desktop only.

Use cursor states such as:

DEFAULT
VIEW
DRAG
OPEN

When hovering project images or rows:

show:

VIEW PROJECT

Cursor effects should be disabled on touch devices.

==================================================
RESPONSIVE DESIGN
==================================================

Desktop may use:

- Three.js
- pinned sections
- large typography
- cursor interactions
- layered screenshots
- strong distortion

Tablet/mobile should reduce complexity.

Mobile:

- simplify Three.js
- reduce distortion
- remove custom cursor
- remove hover-only dependencies
- use clip/reveal animation
- lighter parallax
- maintain readable typography
- avoid horizontal overflow

Do not simply shrink the desktop layout.

Design mobile layouts intentionally.

==================================================
PERFORMANCE
==================================================

This portfolio must remain performant.

Rules:

- optimize project screenshots
- use WebP or AVIF where appropriate
- use next/image
- lazy-load project details
- lazy-load Three.js
- dynamically import WebGL scenes where appropriate
- cap device pixel ratio around 1–1.5 for heavy scenes
- avoid continuous rendering when unnecessary
- pause animations when offscreen
- reduce shader complexity on mobile
- avoid loading every project image on the homepage

Aim for smooth interaction on normal laptops and modern mobile devices.

==================================================
ACCESSIBILITY
==================================================

Preserve and improve accessibility.

Requirements:

- semantic HTML
- keyboard navigation
- visible focus states
- alt text
- reduced-motion support
- sufficient contrast
- touch-friendly controls
- no interaction that only works with a mouse

Existing reduced-motion behavior must remain.

If reduced motion is enabled:

- disable aggressive typography distortion
- disable WebGL movement where possible
- disable smooth scroll
- use simple fades or static presentation

==================================================
SEO
==================================================

Preserve Next.js metadata support.

Add meaningful metadata for:

- Home
- Work
- each project
- About
- Contact

Project detail pages should have:

title
description
Open Graph data where appropriate

==================================================
REMOVE / RETIRE
==================================================

Consider retiring or replacing:

ProjectPreview mock UI
→ replace with real screenshot system

Showcase technology-first page
→ merge into Work

Generic Reveal animation everywhere
→ replace with section-specific motion

Hardcoded skill arrays
→ use portfolio.ts

Duplicated project tech stacks
→ use canonical project data

Generic identical page heroes
→ each route should have a distinct opening layout

==================================================
KEEP / REUSE
==================================================

Reuse where valuable:

- App Router architecture
- Tailwind v4
- MotionProvider
- reduced-motion handling
- Radix Dialog MobileNav
- design token foundation
- Geist
- Inter
- Geist Mono
- Instrument Serif
- dark base palette
- thin-border language
- PageContainer concept
- SectionLabel concept

Refactor rather than rebuild blindly.

==================================================
IMPLEMENTATION PHASES
==================================================

Do not attempt everything in one uncontrolled rewrite.

Follow this order.

PHASE 1
Audit and normalize data.

Tasks:

- fix portfolio.ts
- remove duplicate project metadata
- fix Broadpang technology
- centralize profile
- centralize skills
- centralize projects
- add image metadata
- add project slug
- migrate internal links to next/link

PHASE 2
Create project asset system.

Tasks:

- BrowserFrame
- PhoneFrame
- FullBleedProjectImage
- LayeredProjectScreens
- CroppedProjectImage

Test using Badminton Booking first.

PHASE 3
Create dynamic project detail route.

Build:

/work/[slug]

Implement Badminton Booking first.

Confirm:

- role
- team
- contribution
- stack
- visual gallery
- responsive behavior

PHASE 4
Redesign homepage without advanced 3D first.

Build:

- hero
- kinetic statement
- selected work
- project index
- experience
- capabilities
- about preview
- contact CTA

Ensure static layout is excellent before adding advanced motion.

PHASE 5
Add kinetic typography.

Install/configure:

GSAP
ScrollTrigger
Lenis

Add:

- scroll-reactive text
- marquees
- pinned storytelling
- velocity effects

PHASE 6
Add Three.js.

Install/configure:

three
@react-three/fiber
@react-three/drei

Build:

HeroScene
DistortedImage
ProjectHoverPreview

Keep progressive enhancement.

PHASE 7
Complete project pages.

Add:

Zonepang
Kumtone
Broadpang Extension
Mini Game
DevPath

PHASE 8
Redesign About and Contact.

PHASE 9
QA.

Test:

- desktop
- tablet
- mobile
- keyboard
- reduced motion
- performance
- overflow
- layout shift
- image loading
- WebGL fallback

==================================================
CODE QUALITY
==================================================

Requirements:

- TypeScript where possible
- reusable components
- no duplicated project data
- clear component boundaries
- avoid giant 1000-line components
- use data-driven rendering
- maintain existing project conventions where reasonable
- do not rewrite stable code without reason
- preserve working accessibility behavior

Use meaningful component names.

Possible structure:

components/
  home/
  work/
  project/
  about/
  contact/
  motion/
  webgl/
  shared/
  layout/

==================================================
FINAL DESIGN GOAL
==================================================

The site should feel like a premium experimental portfolio inspired by award-winning editorial websites.

But it must still clearly communicate real engineering work.

The result should not feel like:

a SaaS landing page
a UI kit
a generic portfolio template
a Three.js tech demo

It should feel like:

a real developer portfolio
with strong art direction
real product evidence
careful typography
immersive motion
and technical personality.

==================================================
IMPORTANT
==================================================

Before coding:

1. inspect the current repository
2. read DESIGN_QA.md
3. read QA.md
4. inspect current data architecture
5. inspect current reusable components
6. identify what can be reused
7. create a migration plan
8. then implement phase by phase

Do not destroy working functionality unnecessarily.

After each major phase:

- run lint
- run typecheck
- run build
- inspect responsive behavior
- fix errors before continuing

Do not stop after producing a design plan.

Implement the redesign progressively in the repository.