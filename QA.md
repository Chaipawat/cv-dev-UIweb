# Portfolio QA

## Content
- [x] Full name correct
- [x] Role correct
- [x] Location correct
- [x] Work dates correct
- [x] Education correct (graduation year intentionally omitted — not verified in source data)
- [x] No fabricated information (contact info fixed to configurable fallback; two project tech stacks corrected)
- [x] Confidential work sanitized (all company projects shown as name/type/stack only, no real screenshots)

## Routes
- [x] Home
- [x] Showcase
- [x] Work
- [x] About
- [x] Contact

## Home
- [x] Hero
- [x] Selected Work
- [x] What I Bring

## Showcase
- [x] Category selection
- [x] Skill selection
- [x] Evidence changes
- [x] Keyboard accessible (ARIA tablist + roving tabindex + arrow keys)
- [x] Mobile usable

## Work
- [x] Timeline progresses
- [x] Correct dates
- [x] Active state
- [x] Project records
- [x] Mobile timeline

## Contact
- [x] Email (fallback: "Add email")
- [x] Phone / CV fallback ("Available on CV")
- [x] LinkedIn (fallback: "Add LinkedIn URL")
- [x] GitHub (fallback: "Add GitHub URL")
- [x] CV (fallback: "Add CV link")
- [x] Form (submits, no broken mailto when email unconfigured)

## Responsive
- [x] 375
- [x] 430 (covered by 375/768 range check)
- [x] 768
- [x] 1024 (covered by 768/1440 range check)
- [x] 1280 (covered by 768/1440 range check)
- [x] 1440+

## Accessibility
- [x] Keyboard
- [x] Focus (global visible focus-visible ring added)
- [x] Headings (fixed duplicate <h1>, fixed h1→h3 skips)
- [x] Forms (focus-within states, aria-live status, disabled resubmit)
- [x] Contrast (muted text token lightened to meet 4.5:1 on #050505)
- [x] Reduced motion (MotionConfig reducedMotion="user" + timeline spring bypass)

## Final
- [x] No console errors
- [x] No old UI remains
- [x] Design reviewed
- [ ] User acceptance pending
