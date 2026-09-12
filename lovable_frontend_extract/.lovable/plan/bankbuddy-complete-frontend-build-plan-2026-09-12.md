# BankBuddy — Complete Frontend Build Plan

## Goal
Build a polished, responsive banking application that makes BankBuddy’s core story immediately clear: personalized AI understanding, explainable recommendations, stress detection, ethical protection, and financial wellness for Indian customers.

The supplied project analysis and frontend task sheet remain the source of truth. The implementation will use realistic mock data behind replaceable service modules because no live backend is connected.

## Product structure

### Onboarding and access
- Build `/` as the language-first welcome experience with “Your money. Your language. Your AI.” and a restrained connected-data visual motif.
- Build `/login` with phone entry, OTP verification, trust messaging, and animated transitions.
- Build `/onboarding` as a guided flow: language → consent → customer segment → personalized completion.
- Keep every consent OFF by default and expose “What data is used?” details before proceeding.

### Main application shell
- Create a persistent desktop sidebar and mobile bottom navigation with Home, My Money, Recommendations, Loans, Wellness, Learn, BankBuddy AI, Consent & Privacy, and Profile.
- Add a compact demo-only account switcher for Ramesh, Priya, Suresh, Arjun, and Meena.
- Add responsive header controls for language, notifications, profile, low-data mode, and settings.
- Use separate shareable pages for `/dashboard`, `/money`, `/recommendations`, `/loans`, `/wellness`, `/literacy`, `/consent`, `/whatsapp`, `/ai`, and `/profile`.

### Personalized dashboard
- Build the balance/financial-health card, segment-aware quick actions, upcoming EMIs, life-event insight, recommendations, wellness score, stress state, and animated spending charts.
- Support month, three-month, and six-month chart ranges with accessible tooltips.
- Reorder content and change products/actions for farmer, salaried, shop owner, gig worker, and stressed scenarios.
- Cap recommendations at three and include dismiss/feedback behavior.

### Explainable and ethical AI
- Build expandable “Why this?” explanations with animated positive/negative contribution bars, clear-language reasoning, match score, feedback, and fairness confirmation.
- Enforce the source-of-truth stress rule in the mock layer: scores above 50 cannot receive new credit or loan recommendations.
- Implement GREEN, YELLOW, ORANGE, and RED stress experiences with supportive actions; RED receives a compassionate attention dialog rather than pressure.
- Apply the 30-day repeat-product cooldown and no urgency/dark-pattern copy in mock recommendations.

### BankBuddy AI
- Install and compose the official AI Elements conversation, message, prompt, loading, and tool-result primitives before building the chat surface.
- Build a floating assistant and full `/ai` experience with customer-aware multilingual responses, quick replies, product/action results, EMI controls, and ethical stressed-customer handling.
- Add browser speech recognition where available (`hi-IN` default), with a clear listening state and graceful removal when unsupported.
- Build `/whatsapp` as a labeled simulation using the same mock conversation logic, without implying a live WhatsApp integration.

### Loans, wellness, learning, consent, and profile
- Build the complete seven-step conversational loan flow with persisted in-app progress: product, amount, tenure, personal details, income proof, KYC choice, and confirmation/success.
- Block loan entry and redirect toward restructuring/support for stressed demo customers.
- Build wellness score count-up, animated circle, five-axis radar, trend, improvement actions, and badges.
- Build five “Learn money in 60 seconds” lessons with a focused viewer, 2–3 question quizzes, points, progress, and levels.
- Build the privacy center with granular toggles, explanations, protection indicator, consent history/timeline, download request, and deletion request states.
- Build profile details, masked Aadhaar, segment, language, wellness/stress indicators, settings, and security summary.

## Visual and interaction system
- Use the committed palette: deep indigo `#1A237E`, saffron `#FF6F00`, success `#2E7D32`, warning `#FF8F00`, danger `#C62828`, background `#F5F7FB`, and white surfaces, converted into semantic OKLCH tokens.
- Use Inter for English and Noto Sans Devanagari for Hindi, loaded through the document head.
- Use 18–28px radii, soft elevation, subtle borders, calm spacing, and restrained gradient/data-pulse accents.
- Create an original BankBuddy mark rather than a generic AI icon.
- Add meaningful motion only: page/card sequencing, score/gauge/chart reveals, accordion expansion, chat entry/typing, control feedback, skeleton shimmer, success checks, and reduced-motion fallbacks.
- Preserve 48px touch targets, visible focus, keyboard operation, strong contrast, and no horizontal overflow at 320, 375, 414, 768, 1024, and desktop widths.

## Data, state, and language architecture
- Add central typed domain models and constants for customers, segments, stress levels, products, consents, recommendations, and languages.
- Add Zustand stores for customer/demo mode, onboarding/auth state, loan progress, chat, consent, and UI settings.
- Add an Axios client using `VITE_API_URL`, JWT attachment, refresh/401 behavior, and domain services for auth, customers, transactions, recommendations, stress, chat, loans, consent, wellness, life events, literacy, and audit events.
- Default services to realistic mock adapters while keeping request/response shapes aligned with the supplied Django API contract.
- Add i18next with complete English and Hindi UI coverage, plus selectable starter/core packs for Tamil, Bengali, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, and Assamese with English fallback.
- Keep all visible application copy behind translation keys.

## Loading, errors, offline, and installability
- Add route/page skeletons, chart/recommendation/chat loading states, friendly retry errors, and meaningful consent-driven empty states.
- Add toast feedback for saves, dismissals, requests, and simulated submissions.
- Add an installable app manifest and offline fallback; cache only safe static/mock resources and avoid caching sensitive banking responses.
- Low-data mode will reduce decorative imagery and nonessential motion while preserving all critical information.

## Technical implementation details
- Preserve the project’s existing TanStack Start/Router architecture rather than replacing it with React Router; every route will receive unique BankBuddy metadata.
- Use Tailwind v4 semantic tokens in `src/styles.css`; no hardcoded visual colors in page components.
- Add Motion for React, Zustand, Axios, i18next/react-i18next, Recharts, and the required AI Elements sources. Use Lucide for supporting controls and a custom BankBuddy identity asset.
- Organize reusable code by domain under `components`, `features`, `services`, `stores`, `i18n`, `data`, and `lib`; avoid monolithic page files.
- Use browser-native capture/file controls for the KYC demo, avoiding backend or ML changes.

## Verification
- Validate all five demo profiles and their expected language, recommendations, stress behavior, and blocked-loan rules.
- Exercise onboarding, OTP, consent toggles, demo switching, chart ranges, recommendation explanations, chat, voice fallback, the seven loan steps, quizzes, privacy actions, and mobile navigation.
- Verify desktop and mobile screenshots with browser automation, confirm no overlap or horizontal scrolling, and inspect console/network failures.
- Run the project’s automated checks and ensure every content route has unique title, description, Open Graph, and Twitter metadata.

## Out of scope without external inputs
- Real phone authentication, webcam verification, document processing, WhatsApp delivery, Django API responses, ML inference, data export/deletion execution, and deployment remain simulated until their external services are supplied.
