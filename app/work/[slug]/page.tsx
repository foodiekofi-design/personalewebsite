import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";
import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import CountUp from "../../components/CountUp";

// A StudyImage can be a real asset (src + optional width/height) OR a
// placeholder slot (placeholder: true) that renders a dashed box with the
// `caption` as an instruction and `src` as the suggested filename/path.
// `ratio` (e.g. "16/9", "4/3", "3/4") controls the box shape.
type StudyImage = { src: string; caption: string; width?: number; height?: number; placeholder?: boolean; ratio?: string; full?: boolean; maxW?: string };
type Insight = { stat?: string; text: string };

type CaseStudy = {
  title: string;
  company: string;
  year: string;
  type: string;
  role?: string;
  team: string;
  tools: string;
  platform: string;
  tldr: string;
  metrics: { value: string; label: string }[];
  context?: string;
  problem: string;
  goals?: string[];
  insights?: Insight[];
  approach: { heading: string; body: string; image?: StudyImage; pair?: { before: StudyImage; after: StudyImage; caption?: string } }[];
  outcome: string;
  learned: string;
  tags: string[];
  heroColor: string;
  heroTextLight: boolean;
  heroImage: string | null;
  images: StudyImage[];
  partners?: { name: string; note: string; logo?: string }[];
  related?: { slug: string; label: string };
};

// Renders a still image or an autoplaying, muted, looping video (detected by
// file extension), sized to fill its container. Used inside device-style frames.
function Media({ img, fill }: { img: StudyImage; fill?: boolean }) {
  const isVideo = /\.(mp4|webm|mov)$/i.test(img.src);
  if (isVideo) {
    return <video src={img.src} autoPlay muted loop playsInline preload="metadata" className={fill ? "absolute inset-0 h-full w-full object-contain" : "block w-full h-auto"} />;
  }
  if (fill) {
    return <Image src={img.src} alt={img.caption} fill className="object-contain" sizes="(max-width: 1024px) 45vw, 380px" />;
  }
  return (
    <Image
      src={img.src}
      alt={img.caption}
      width={img.width ?? 1080}
      height={img.height ?? 1920}
      className="block w-full h-auto"
      sizes="(max-width: 1024px) 45vw, 380px"
    />
  );
}

// Renders a case-study figure: a real image, or a dashed placeholder slot with
// an instruction for what visual to add. `full` breaks out to a wide band;
// otherwise it sits inline in the reading column (good beside a narrative step).
function Figure({ img, full = true }: { img: StudyImage; full?: boolean }) {
  const ratio = (img.ratio ?? "16/9").replace("/", " / ");
  const isVideo = /\.(mp4|webm|mov)$/i.test(img.src);
  const inner = (
    <div className={full ? "max-w-5xl mx-auto" : ""}>
      {img.placeholder ? (
        <div
          className="rounded-2xl border-2 border-dashed border-[#d4d4d4] bg-[#fafafa] flex flex-col items-center justify-center text-center px-6 py-10 gap-2"
          style={{ aspectRatio: ratio }}
        >
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#e63329]">Add visual</span>
          <p className="text-sm text-[#555] max-w-md leading-snug">{img.caption}</p>
          {img.src && <p className="text-xs text-[#b0b0b0] font-mono mt-1">{img.src}</p>}
        </div>
      ) : isVideo ? (
        <div className={`${img.maxW ?? "max-w-3xl"} mx-auto`}>
          <video src={img.src} autoPlay muted loop playsInline preload="metadata" className="block w-full h-auto" />
        </div>
      ) : img.width && img.height ? (
        <Image
          src={img.src}
          alt={img.caption}
          width={img.width}
          height={img.height}
          className="w-full h-auto rounded-xl ring-1 ring-black/10 bg-[#faf9f6]"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      ) : (
        <div className="relative w-full rounded-xl overflow-hidden ring-1 ring-black/10 bg-[#f4f4f4]" style={{ aspectRatio: ratio }}>
          <Image src={img.src} alt={img.caption} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 1024px" />
        </div>
      )}
      {!img.placeholder && <figcaption className="text-sm text-[#999] mt-3 text-center font-light">{img.caption}</figcaption>}
    </div>
  );
  return full ? (
    <figure className="w-[100vw] relative left-1/2 -translate-x-1/2 px-6 md:px-12">{inner}</figure>
  ) : (
    <figure className="mt-5">{inner}</figure>
  );
}

// Order here is the recommended reading order; the home page controls card order.
const caseStudies: Record<string, CaseStudy> = {
  "film-finder": {
    title: "Growing a film-discovery app I co-founded from 20 to 100 weekly users",
    company: "Film Finder",
    year: "2024 to present",
    type: "iOS · Android · Founder",
    role: "Co-founder · Design and code",
    team: "Co-founder leading design and shipping code, alongside a developer and a product manager.",
    tools: "Figma, Figma MCP, Claude, React Native, Typeform, Miro",
    platform: "iOS and Android",
    tldr: "Film Finder's early users could not find films that matched their actual taste, only their genre. I redesigned discovery and onboarding and shipped front-end code myself. Weekly active users grew from around 20 to 100 and the newsletter reached 2,000 subscribers.",
    metrics: [
      { value: "5×", label: "weekly active users" },
      { value: "2,000", label: "Substack subscribers" },
      { value: "iOS + Android", label: "live in both stores" },
    ],
    context:
      "Film Finder is a startup I co-founded to help people find something worth watching faster. Its whole promise is to find films at lightning speed, but the early product was not living up to it. The homepage and onboarding created unnecessary cognitive load and slow decision making, which drove high drop off and churn right after signup. Working with a developer and a product manager, my role blended product design and design engineering. I ran the research, built the prototypes, and shipped UI changes directly in the app using AI-assisted coding.",
    problem:
      "Genre filtering was too blunt. Someone who loves Parasite and Get Out does not want \"horror and thriller\", they want a specific tone and intelligence that tags cannot capture. The homepage was a generic feed, and onboarding was a wall of posters that created noise and drop off straight after signup.",
    goals: [
      "Help people decide what to watch quickly, and feel confident in the choice.",
      "Cut the cognitive load in onboarding so capturing taste feels lightweight, not like work.",
      "Test whether social discovery could add value without diluting the core job of finding a film.",
    ],
    insights: [
      { stat: "65%", text: "response rate across 22 participants in interviews and Typeform concept testing. The clearest theme: people do not want more options, they want better guidance." },
      { text: "Long lists and poster-heavy onboarding made decisions feel heavier, not easier. Cognitive load at first run was the real source of drop off." },
      { text: "On social, people cared about shared taste and context far more than generic following. That reframed social as support for discovery, not a competing feature." },
    ],
    approach: [
      {
        heading: "Talked to the people who were leaving",
        body: "I ran 12 interviews with early users, 22 in total at a 65% response rate, paired with Typeform concept tests with existing users. One pattern came up again and again: people do not want more options, they want better guidance.",
        image: { src: "/projects/film-finder/research-synthesis.png", width: 1838, height: 1270, full: true, caption: "Research synthesis from 22 participants: interview themes and Typeform results, with each assumption tested and either validated or rejected against the evidence. The clearest signal was guidance over options." },
      },
      {
        heading: "Cut choice with a Top 3 For You home",
        body: "I replaced the generic feed with a constrained \"Top 3 For You\" model for fast decisions, and moved deeper browsing into a separate Discover tab so the two jobs stopped fighting each other. Showing only three felt risky, but in testing it did the opposite of what I feared: fewer options raised confidence instead of frustration.",
        pair: {
          before: { src: "/projects/film-finder/home-before.png", width: 1041, height: 2277, caption: "Before" },
          after: { src: "/projects/film-finder/top-3-after.mp4", caption: "After" },
          caption: "Before: the old, generic homepage feed. After: the new Top 3 For You home (a screen recording of the prototype).",
        },
      },
      {
        heading: "Simplified onboarding to genre chips",
        body: "Genre selection went from poster heavy screens to compact chips that are faster to scan and complete. Onboarding dropped from seven steps to three, which cut the visual noise and made capturing taste feel lightweight rather than effortful.",
        pair: {
          before: { src: "/projects/film-finder/onboarding-before.png", width: 804, height: 1744, caption: "Before" },
          after: { src: "/projects/film-finder/onboarding-after.png", width: 590, height: 1276, caption: "After" },
          caption: "Before: the poster-heavy genre picker. After: compact, colour-coded chips. Onboarding dropped from seven steps to three.",
        },
      },
      {
        heading: "Made discovery feel effortless with Shuffle",
        body: "As category lists grew, scrolling felt like work rather than exploration. I redesigned category pages around fewer, larger posters and added a Shuffle action: one tap generates a fresh set of films. A lightweight dice micro-interaction makes it feel playful and intentional, and I tested it with our community over WhatsApp before shipping.",
        pair: {
          before: { src: "/projects/film-finder/shuffle-before.png", width: 704, height: 1480, caption: "Before" },
          after: { src: "/projects/film-finder/shuffle-after.mp4", caption: "After" },
          caption: "Before: a long, text-heavy list to scroll through. After: fewer, larger posters with a one-tap Shuffle that generates a fresh set of films.",
        },
      },
      {
        heading: "Explored social as a discovery aid, not a feed",
        body: "Rather than bolt on generic following, I designed profiles around film identity: what someone has watched, liked, or wants to watch, with shared taste at the centre. Treating social as a way to strengthen recommendations rather than compete with them kept the core decision fast while opening a credible path to stickiness.",
        image: { src: "/projects/film-finder/social-profile.png", width: 1125, height: 2438, maxW: "max-w-[300px]", caption: "A profile built around film identity: watchlist, liked and seen, framed around finding films through shared taste rather than a follower feed." },
      },
      {
        heading: "Built a component library and shipped in code",
        body: "I built the component library in Figma covering recommendation cards, film detail cards, genre chips and navigation states, then wrote production React Native alongside my co-founder. For small UI changes I used Figma MCP and Claude to prototype and ship directly, keeping engineering time on higher-impact work.",
        image: { src: "/projects/film-finder/component-library.png", width: 1798, height: 1408, full: true, maxW: "max-w-4xl", caption: "The component library, built atomic-design style: buttons, inputs and content atoms composed into molecules like search, section headers and the top-three card." },
      },
    ],
    outcome:
      "Weekly active users grew from around 20 to roughly 100 a week after the redesign, and the Substack newsletter reached 2,000 subscribers, part of a wider community of over 7,000 across our socials, newsletter and the monthly film club we run. The taste anchored recommendation model became the core of how we position the product, and we are now rolling it out in a modern liquid-glass style with a matching marketing site.",
    learned:
      "First session experience drives retention more than feature depth. Reducing choice at the right moments raised confidence rather than frustration, and the growth came once we finally simplified onboarding. I would have done that six months earlier.",
    tags: ["iOS", "Android", "Consumer App", "Founder", "Design Systems"],
    heroColor: "#0a0a0a",
    heroTextLight: true,
    heroImage: "/projects/film-finder.png",
    images: [
      { src: "/projects/film-finder/film-finder-reel.mp4", maxW: "max-w-[460px]", caption: "Film Finder today: the redesigned discovery experience, live on iOS and Android." },
    ],
    partners: [
      { name: "Barclays", note: "Funding through their accelerator programme", logo: "/projects/film-finder/partners/barclays.png" },
      { name: "Sky", note: "Leadership and mentorship", logo: "/projects/film-finder/partners/sky.png" },
      { name: "Everyman", note: "Partner for our monthly film clubs", logo: "/projects/film-finder/partners/everyman.png" },
      { name: "University of Southampton", note: "Internship partnership", logo: "/projects/film-finder/partners/southampton.png" },
    ],
    related: { slug: "film-finder-brand", label: "See the Film Finder brand identity" },
  },
  "film-finder-brand": {
    title: "One brand, from the website to the shirt",
    company: "Film Finder",
    year: "2024 to present",
    type: "Brand · Identity System",
    team: "Solo. I designed the full identity.",
    tools: "Figma, Illustrator, Blender",
    platform: "Product, web, merch, social",
    tldr: "Most film apps borrow the same streaming-service look: muted, cinematic, dark. As a co-founder I built Film Finder's identity to do the opposite. One bolt, one yellow, a confident voice, working across the app, the site, the merch and social as a single system.",
    metrics: [
      { value: "1", label: "mark, every surface" },
      { value: "5", label: "core brand colours" },
      { value: "7,000+", label: "community members" },
    ],
    context:
      "When I joined Film Finder it had a product but no real identity. Streaming brands nearly all look the same: muted, cinematic, dark. As a co-founder I built the identity to do the opposite and give the product a point of view it could grow into, working as a single system across the app, the site, merch and social.",
    problem:
      "Streaming lives in muted prestige: Netflix red, Apple grey, Disney navy, HBO black. Blending into that meant blending into the category. Film Finder also had a product promise, find films at lightning speed, that the brand was not yet carrying. The identity had to feel as fast and decisive as the product, and hold up everywhere from an App Store icon to a t-shirt.",
    goals: [
      "Stand out in a category that defaults to dark, muted, cinematic branding.",
      "Carry the product promise, find films at lightning speed, into how the brand looks and sounds.",
      "Build a system tight enough to hold from a 1024px App Store icon down to a printed shirt.",
    ],
    approach: [
      {
        heading: "Picked a fight with the category",
        body: "An identity has to be loud enough to refuse what the category assumes. I rejected the dark cinematic language on purpose. The brand is the light in the room, not the screen on the wall, which makes it stand out instantly in a feed of black thumbnails.",
      },
      {
        heading: "One mark, many surfaces",
        body: "The bolt is the constant. Its form never changes, but the background adapts to context: black gradient for the default iOS icon, solid yellow for brand moments, darker tones for editorial. One recognisable mark that flexes across product, marketing and content.",
      },
      {
        heading: "Named colour by job, not by hue",
        body: "Tokens are named by function, not colour, so video backgrounds or cards change role without breaking. One firm rule keeps it sharp: yellow is never tinted, it is #F9D61B or nothing.",
      },
      {
        heading: "Gave it a voice",
        body: "Fast, direct, unapologetic. The copy never narrates or over-explains, which makes the product feel quick to use. \"We don't curate. We pick.\" The same voice runs from the App Store listing to the newsletter.",
      },
      {
        heading: "Carried it end to end",
        body: "I took the system across every surface the product touches: the app, the App Store page, the marketing site, social templates, and merch down to the shirt and tote. The brand implies a community, and every surface earns the same mark.",
      },
    ],
    outcome:
      "Film Finder now has one coherent identity that works from a 1024px App Store icon down to a printed bolt on a shirt. The brand became part of how the product grew, from 20 to around 100 weekly active users, a 2,000 strong newsletter and a 7,000-strong community across our socials and the monthly film club we run, and it gives the product a recognisable point of view in a category that mostly looks the same.",
    learned:
      "A brand built end to end only works if the rules are tight enough to survive other people using them. Naming colour by job and fixing the yellow meant the identity held together as the product, marketing and content all pulled on it at once.",
    tags: ["Brand Identity", "Design Systems", "Art Direction", "Founder"],
    heroColor: "#1b2436",
    heroTextLight: true,
    heroImage: "/projects/brand/statement.png",
    images: [
      { src: "/projects/brand/logo.png", caption: "One mark, many surfaces: the bolt holds while the background adapts to context.", width: 1440, height: 1610 },
      { src: "/projects/brand/colour.png", caption: "Colour named by job, not by hue. Yellow is #F9D61B or nothing.", width: 1440, height: 1000 },
      { src: "/projects/brand/type.png", caption: "One type family across display, section and body, so the brand reads consistently from banner to caption.", width: 1440, height: 980 },
      { src: "/projects/brand/voice.png", caption: "Voice: fast, direct, unapologetic. We don't curate, we pick.", width: 1440, height: 850 },
      { src: "/projects/brand/surfaces.png", caption: "The app, the site, the shirt. Every surface earns the same mark.", width: 1440, height: 770 },
      { src: "/projects/brand/product.png", caption: "In product: the brand idea made interface, built to speed up the decision.", width: 1440, height: 1260 },
      { src: "/projects/brand/web.png", caption: "On the web: find great films at lightning speed.", width: 1440, height: 1546 },
      { src: "/projects/brand/merch.png", caption: "A shirt to match the bag. The bolt printed on real things.", width: 1440, height: 1320 },
      { src: "/projects/brand/accents.png", caption: "An expanded family of accents for editorial and poster treatments.", width: 1440, height: 1150 },
    ],
    partners: [
      { name: "Barclays", note: "Funding through their accelerator programme", logo: "/projects/film-finder/partners/barclays.png" },
      { name: "Sky", note: "Leadership and mentorship", logo: "/projects/film-finder/partners/sky.png" },
      { name: "Everyman", note: "Partner for our monthly film clubs", logo: "/projects/film-finder/partners/everyman.png" },
      { name: "University of Southampton", note: "Internship partnership", logo: "/projects/film-finder/partners/southampton.png" },
    ],
    related: { slug: "film-finder", label: "See the Film Finder product case study" },
  },
  "ai-workflows": {
    title: "Designing AI agent deployment at Gearset, prototyped and shipped in code",
    company: "Gearset",
    year: "2025 to present",
    type: "Enterprise · AI Agent Tooling",
    role: "UX Designer, prototyping and shipping in code",
    team: "A product squad, with engineers and a PM.",
    tools: "Figma, Claude Code, React, TypeScript, Storybook",
    platform: "Web · Salesforce DevOps",
    tldr: "Gearset helps teams deploy Salesforce's newest products: AI agents (Agentforce) and its data platform. Their setup is dense, versioned data that's easy to get wrong. I design how teams deploy it safely, and I build it in real code, so my design ships instead of getting handed off.",
    metrics: [
      { value: "Days, not weeks", label: "idea to working prototype" },
      { value: "Code, not mockups", label: "how I prototype and hand off" },
      { value: "Whole team", label: "prototyping with real components" },
    ],
    context:
      "Gearset is the leading Salesforce DevOps platform. I design how teams deploy Salesforce's newest products: AI agents (Agentforce) and its data platform. These arrived fast and messy. Their setup lives as scattered data rather than clean, reviewable files, so a change is hard to read and easy to get wrong. My job is to fix that. What's a bit different is how I do it: I prototype in real code, in the product's own design system, so the prototype often becomes the thing that ships.",
    problem:
      "This setup is dense, layered and versioned. Look at it raw and you can't easily tell what a change does, or which version you're even looking at. Get it wrong and you can break a live agent or a live data flow. It also has to work for two very different people at once: admins who point and click, and developers who live in code.",
    goals: [
      "Make dense agent and data changes readable, so a team can tell what changed without reading raw metadata.",
      "Make version and deployment choices deliberate, so the risky ones are hard to make by accident.",
      "Serve admins and developers on one surface, through progressive disclosure.",
    ],
    insights: [
      { text: "Read raw, complex changes were hard to review. You couldn't quickly answer the one question a deploy hangs on: what does this actually do?" },
      { text: "The riskiest mistakes were the invisible ones, where nothing on screen told you that a choice carried real consequences." },
      { text: "Admins and developers needed the same surface to feel both simple and deep, so structure and progressive disclosure mattered more than raw completeness." },
    ],
    approach: [
      {
        heading: "Prototyped in code, in the product's real design system",
        body: "Instead of handing over static mockups, I build working prototypes in real code, using the product's own components and design tokens. Because it's built from real materials, the prototype can become the thing that ships, not a picture engineering has to rebuild. It also lets me test how something actually behaves, which a flat mockup can't.",
        image: { placeholder: true, ratio: "16/9", src: "/projects/ai-workflows/prototype-in-code.png", caption: "A before/after or diagram: static mockup vs a working prototype built from real components. Recreate this yourself as a generic illustration, do not use internal product screenshots." },
      },
      {
        heading: "Gave the whole team real-component prototyping",
        body: "I connected our codebase's design system to an AI-assisted design workflow, so the team, including PMs, could prototype with the real components and tokens instead of throwaway boxes. Ideas got tried in the product's actual visual language before engineering time was spent, which raised the quality of what we debated.",
        image: { placeholder: true, ratio: "16/9", src: "/projects/ai-workflows/real-component-workflow.png", caption: "Your own diagram of the workflow: design system to AI-assisted prototyping to anyone on the team prototyping with real components. This is fully your method, safe to show." },
      },
      {
        heading: "Designed for readable review of complex changes",
        body: "Most of the design work is making dense, layered setup readable. Show the structure instead of raw text, put the important state first, play down what hasn't changed, and reveal depth only when someone needs it. The aim is simple: you can look at a change and understand it before you act.",
        image: { placeholder: true, ratio: "4/3", src: "/projects/ai-workflows/readable-review.png", caption: "Abstract before/after: a wall of dense metadata vs a clean, readable structure. Recreate as a generic illustration, not an internal screenshot of unreleased UI." },
      },
      {
        heading: "Made risky choices deliberate",
        body: "Where a choice could do real damage, I designed so the safe path was the default and the risky one was hard to take by accident: I surfaced state clearly, and reused interaction patterns people already knew rather than inventing new ones. I treated making risk visible as part of the core design, not something to tidy up at the end.",
        image: { placeholder: true, ratio: "4/3", src: "/projects/ai-workflows/deliberate-choices.png", caption: "A simple, self-made concept diagram of the safety idea (safe path as the default, risky action made explicit). Keep it abstract." },
      },
      {
        heading: "Built an AI research and synthesis loop",
        body: "Around the design work I built a small set of custom AI assistants sharing one domain brief: capturing meetings, synthesising research, and scanning a fast-moving competitive space. It kept my research current instead of going stale between stages, on a product where the underlying platform changes every few months.",
        image: { placeholder: true, ratio: "16/9", src: "/projects/ai-workflows/research-loop.png", caption: "Your own diagram of the AI sub-agent research loop feeding your design decisions. Fully your method, safe to show." },
      },
    ],
    outcome:
      "Prototyping in code moved the team's conversations from arguing over static screens to reacting to working software, and connecting the design system to an AI workflow let PMs and designers prototype in the product's real language. The honest part came next: shipping a clearer, safer capability is not the same as getting teams to use it, so more of my work moved into defaults, discoverability and onboarding.",
    learned:
      "Two things stuck with me. On a surface where a bad change has real consequences, you have to design for making risk visible and mistakes easy to undo from the start, not add it at the end. And prototyping in code changes the whole conversation: showing people something real and interactive beats debating mockups, and it means the thing I designed is usually the thing that ships.",
    tags: ["AI Agent Tooling", "Design Engineering", "Prototyping in Code", "Enterprise UX", "Design Systems"],
    heroColor: "#0f1117",
    heroTextLight: true,
    heroImage: "/projects/ai-workflows.png",
    images: [],
  },
  "beauhurst-integrations": {
    title: "Shipping Beauhurst's first CRM integration to 73 clients, 46% past target",
    company: "Beauhurst",
    year: "2023",
    type: "B2B SaaS · Enterprise",
    team: "One designer (me), engineering team, product lead",
    tools: "Figma, Condens, Maze, HubSpot API",
    platform: "Web",
    tldr: "Beauhurst customers kept their CRMs current by hand, exporting a CSV and cleaning it in Excel, which took some of them up to three days. I designed the company's first native integration. The goal was 50 active clients by mid 2024. We reached 73.",
    metrics: [
      { value: "73", label: "clients adopted" },
      { value: "46%", label: "above target" },
      { value: "45", label: "also using the API" },
    ],
    context:
      "Beauhurst is a SaaS platform with data on millions of high growth UK companies, used for company searches, due diligence and financial analysis. The problem account managers kept hearing was that getting that data into the tools clients actually worked in was painful. I led product strategy and design for the company's first native CRM integration, built for HubSpot and architected to scale to other CRMs like Salesforce.",
    problem:
      "Beauhurst's data was hard to get into the tools clients actually worked in. The API only suited larger clients with developers, so most people exported a CSV and cleaned it up in Excel before uploading it to their CRM. For some clients that round trip took up to three days, and the data was stale the moment a company record changed. They wanted Beauhurst data living inside their CRM and kept fresh on its own.",
    goals: [
      "Give clients an out of the box way to get Beauhurst data into the CRM they already use.",
      "Keep that data fresh automatically, so it stops going stale the moment a record changes.",
      "Design it to scale cleanly to other CRMs without redesigning from scratch.",
    ],
    insights: [
      { stat: "7", text: "client interviews coded in Condens. HubSpot came up in every single one, so we focused there rather than trying to support everything at once." },
      { text: "Two roles emerged: admins who live in the platform daily, and managers who set it up once and step back. The flows had to serve both." },
      { text: "People did not want to hand pick fields. They wanted all of it, created for them automatically, so we dropped the field by field checkboxes." },
    ],
    approach: [
      {
        heading: "Found out which tools actually mattered",
        body: "I interviewed seven clients and coded the transcripts in Condens. HubSpot came up in every single interview, so that is where we focused rather than trying to support everything at once. Two roles emerged: admins who live in the platform day to day, and managers who set the process up once and step back. The flows had to serve both.",
        image: { src: "/projects/integrations-research.png", ratio: "16/9", caption: "Discovery sessions mapping the CRM workflows clients actually used, coded in Condens." },
      },
      {
        heading: "Synced collections, not companies",
        body: "We first planned to sync individual companies, but at scale that would have overloaded the platform. I moved the sync to operate on Collections instead. It scaled cleanly and gave people a clearer mental model: the Collection is the thing that syncs. I also moved the controls out of buried settings into the Collections area, where people already expected them to live.",
        image: { placeholder: true, ratio: "4/3", src: "/projects/beauhurst-integrations/collections-sync.png", caption: "The sync controls living in the Collections area: the key screen where a user picks a Collection to sync. Frame it inside the Beauhurst UI, high fidelity." },
      },
      {
        heading: "Removed the busywork",
        body: "Testing showed people did not want to hand pick fields, they wanted all of it. So on first sync we create the Beauhurst fields in HubSpot automatically and drop the field by field checkboxes. We accepted one trade: companies added to a synced Collection appear in the CRM the next day, not instantly, because immediate sync would exceed platform load. Once that was stated clearly in the UI, nobody in testing minded.",
        image: { placeholder: true, ratio: "4/3", src: "/projects/beauhurst-integrations/first-sync-before-after.png", caption: "Before/after of the setup: the field-by-field checkboxes removed, fields auto-created in HubSpot, with the clearly-stated 'appears next day' note in the UI." },
      },
      {
        heading: "Worked end to end with engineering",
        body: "I journey mapped the touchpoints, prototyped from low to high fidelity in Figma, and tested with 20 internal and external users through Maze. Then I wrote the specs, ran the backlog in Notion, and reviewed pull requests on GitHub with the team so the build matched the intent.",
        image: { src: "/projects/integrations-heatmap.png", ratio: "16/9", caption: "Usability testing on the mapping flow: 5.6s average to complete, 24% misclick rate before iteration." },
      },
    ],
    outcome:
      "The target was 50 active clients by June 2024. We reached 73, with 45 of them also using the API, and clients described the integration as easy and straightforward. The collections and sync patterns became a reference other Beauhurst features reused.",
    learned:
      "Designing for someone else's platform means letting go of some control. Consistency is not visual sameness, it is fitting the host's mental model. And a lot of the work here was doing less, not more: fewer fields, fewer settings, fewer decisions left to the user.",
    tags: ["Product Design", "User Research", "Design Systems", "B2B SaaS"],
    heroColor: "#f5f0eb",
    heroTextLight: false,
    heroImage: "/projects/integrations.png",
    images: [],
  },
  "charges-and-mortgages": {
    title: "Lifting subscription orders 20% by bringing charge and mortgage data into Beauhurst",
    company: "Beauhurst",
    year: "2023",
    type: "B2B SaaS · Data Platform",
    team: "One designer (me), engineering team, data lead",
    tools: "Figma, Condens, Zoom",
    platform: "Web",
    tldr: "Invoice financiers and lenders needed charge and mortgage data, the legal claims against a company's assets, to judge risk. The only real source was clunky and lived outside Beauhurst. I designed it into the platform. Subscription orders rose 20% and the feature drew over 3,600 views in three months, against a predicted 1,000.",
    metrics: [
      { value: "20%", label: "subscription increase" },
      { value: "3,600+", label: "views in 3 months" },
      { value: "3.6×", label: "predicted traffic" },
    ],
    context:
      "Beauhurst kept getting client requests to add charge and mortgage data, the legal claims a company gives against its assets when it takes on secured debt. Invoice financiers and lenders use it to judge risk for due diligence, but the only real source was Companies House. I was tasked with bringing this dense legal dataset into the platform and making it readable for people who understand it commercially, not legally.",
    problem:
      "Analysts, invoice financiers and lenders needed to check charges and mortgages to judge risk against a company's assets. The only real source was Companies House, which was non interactive and cumbersome, so people worked across separate tools instead of inside Beauhurst. The hard part was making dense legal data readable for someone who understands what it means commercially, not legally.",
    goals: [
      "Make charge and mortgage data searchable, so users can find companies that hold secured debt.",
      "Help people read a company's debt history and risk at a glance, without opening legal documents.",
      "Build it as a system that later datasets could slot into.",
    ],
    insights: [
      { stat: "5", text: "interviews with invoice financiers, refinanciers and lenders, coded in Condens. Historical timelines, not single data points, were what actually drove a lending decision." },
      { text: "People disagreed on whether a charge is even a transaction, and the words charges versus mortgages caused real confusion. Language was a design problem, not just a labelling one." },
    ],
    approach: [
      {
        heading: "Learned how risk people actually think",
        body: "I ran remote interviews with five customers, invoice financiers, refinanciers and lenders, and coded them in Condens. Two things stood out. People disagreed on whether a charge is even a transaction, and the words themselves, charges versus mortgages, caused real confusion. Historical timelines kept coming up as the thing that actually drives a lending decision.",
        image: { placeholder: true, ratio: "16/9", src: "/projects/charges-and-mortgages/research-coding.png", caption: "Research artifact: interview coding in Condens surfacing the charges-vs-mortgages language confusion and the 'timelines drive the decision' theme." },
      },
      {
        heading: "Stopped forcing charges into transactions",
        body: "My first concept tucked charge data inside the existing Transactions tab. Moderated testing with two financier clients and three account managers killed that quickly: people see charges as separate from fundraising events, and mixing them broke their mental model. I gave charges their own dedicated tab, which also made the relationship between charges and mortgages clear.",
        image: { placeholder: true, ratio: "4/3", src: "/projects/charges-and-mortgages/tab-before-after.png", caption: "Before/after: the rejected concept with charges buried in the Transactions tab, versus the dedicated Charges tab that matched people's mental model." },
      },
      {
        heading: "Made status and history legible",
        body: "A traffic light system shows charge satisfaction at a glance, so you can read risk without opening anything. Detail sits behind modals, using progressive disclosure to avoid overload. For history I redesigned the timeline around a transit map style, which gave people the temporal context to assess risk without reading the underlying legal documents.",
        image: { placeholder: true, ratio: "4/3", src: "/projects/charges-and-mortgages/timeline-traffic-light.png", caption: "The hero screen: the traffic-light satisfaction system plus the transit-map style charge-history timeline. Make this your most polished mockup, it carries the case study." },
      },
      {
        heading: "Built it to take the next dataset",
        body: "I worked within third party data limits and regulatory definitions, and handed structured specs to engineering. I built it as a system, so later data types could slot into the same search, tab and disclosure patterns rather than being designed from scratch.",
        image: { placeholder: true, ratio: "16/9", src: "/projects/charges-and-mortgages/search-modal.png", caption: "Advanced search plus the modal progressive-disclosure pattern, framed inside the platform to show the reusable system." },
      },
    ],
    outcome:
      "Subscription orders rose 20%, and the feature drew over 3,600 unique views in three months against a predicted 1,000. The dedicated tab, advanced search and modal system shipped, and the patterns carried into later data features on the platform.",
    learned:
      "Designing for complex data is about clarifying meaning, not oversimplifying structure. People's mental models around debt and risk turned out to be more useful than the underlying data schema, and designing to those models is what made the legal detail usable.",
    tags: ["Data UX", "Product Design", "Enterprise"],
    heroColor: "#0a0a0a",
    heroTextLight: true,
    heroImage: "/projects/charges.png",
    images: [],
  },
  translink: {
    title: "Accessible chatbot research that shaped the service Translink shipped next",
    company: "Translink",
    year: "2022",
    type: "Conversational · Accessibility",
    team: "Worked with a UX design lead, plus stakeholder workshops",
    tools: "Chatbot.com, Figma, persona workshops",
    platform: "Mobile and web",
    tldr: "Translink's call centre was overwhelmed by repeat questions from disabled and impaired users. I researched and designed an accessible chatbot. The prototype was not shipped on budget grounds, but the research shaped the voice service Translink launched next, which cut call volume.",
    metrics: [
      { value: "30", label: "chatbots benchmarked" },
      { value: "12", label: "real calls analysed" },
      { value: "Live", label: "fed a shipped service" },
    ],
    context:
      "Translink is a public transport corporation in Northern Ireland. Its call centre was overwhelmed by repeat questions from disabled and impaired travellers about step free access, staff support and train times, which strained representatives and pushed up wait times. Working with a UX design lead, I researched and designed an accessible, conversational journey planning experience to give those travellers a genuine self serve option.",
    problem:
      "Disabled and impaired users were calling Translink for the same things over and over: accessibility features, staff support, schedules. That strained representatives and pushed up wait times. They needed a clear, accessible self serve option that did not assume how a user reads, scrolls or remembers.",
    goals: [
      "Give impaired and able bodied travellers an equitable, stress free way to plan journeys.",
      "Take pressure off the call centre by answering the questions people actually phone in with.",
      "Design to real accessibility needs from the first screen, aligned to WCAG.",
    ],
    insights: [
      { stat: "25 to 30", text: "chatbot apps benchmarked with heuristic evaluation. The same gaps recurred: bots rarely say what they can do, dead end when misunderstood, and break when text is zoomed." },
      { stat: "12", text: "real call centre recordings analysed, plus a persona workshop, so the chatbot answered the questions people actually had rather than the ones we assumed." },
      { text: "Testing with six people with mixed cognitive and visual needs showed onboarding had to state capabilities up front, and journey details had to stay visible, not buried in the thread." },
    ],
    approach: [
      {
        heading: "Benchmarked widely",
        body: "I ran heuristic evaluations against 25 to 30 chatbot apps, scoring each for onboarding, error handling and responsive behaviour. The same gaps showed up everywhere: chatbots rarely tell you what they can actually do, they dead end when they misunderstand you, and they break when the text is zoomed.",
        image: { src: "/projects/translink-heuristics.png", ratio: "16/9", caption: "Heuristic evaluation mapping violations, severity and recommendations across 25-30 benchmarked chatbots." },
      },
      {
        heading: "Grounded it in real conversations",
        body: "A persona workshop with stakeholders mapped the different users and how each one relied on the service. I then analysed 12 real call centre recordings to shape the chatbot's structure and tone, so it answered the questions people actually phoned in with, not the ones we assumed.",
        image: { placeholder: true, ratio: "16/9", src: "/projects/translink/personas-workshop.png", caption: "Persona workshop output plus the call-analysis themes that shaped the bot's structure and tone. A clean, framed research board." },
      },
      {
        heading: "Tested with real needs",
        body: "Six participants with mixed cognitive and visual needs tested the prototype. Three findings drove the redesign: onboarding had to state the chatbot's features up front, people needed reassurance and clarity on departure and arrival times, and difficulty recalling journey details made them fall back on other aids. So I made onboarding spell out what it could do, kept journey information visible instead of buried in the thread, and built a layout that did not force horizontal scrolling even at 400% zoom.",
        image: { placeholder: true, ratio: "4/3", src: "/projects/translink/accessible-chat.png", caption: "The accessible chat flow: onboarding that states capabilities up front, journey info kept visible, and a layout that holds at 400% zoom. One or two framed screens." },
      },
    ],
    outcome:
      "The prototype did not ship because of budget, but the research fed directly into the voice service Translink rolled out next, which reduced call centre queries. Foundational research moved the product even when the first deliverable did not launch.",
    learned:
      "Accessibility cannot be a layer you add at the end. Building for cognitive and visual needs from the first screen changed the structure of the whole flow, not just its styling.",
    tags: ["Conversational Design", "Accessibility", "User Research", "Service Design"],
    heroColor: "#1a1a1a",
    heroTextLight: true,
    heroImage: "/projects/translink.png",
    images: [],
  },
};

export async function generateStaticParams() {
  return Object.keys(caseStudies).map(slug => ({ slug }));
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  const textColor = study.heroTextLight ? "text-white" : "text-[#0a0a0a]";
  const mutedColor = study.heroTextLight ? "text-white/50" : "text-[#888]";
  const meta = [
    { label: "Role", value: study.role ?? "Product Designer" },
    { label: "Platform", value: study.platform },
    { label: "Team", value: study.team },
    { label: "Tools", value: study.tools },
  ];

  return (
    <>
      <Nav />
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <div
          className="w-full pt-32 pb-16 px-6 md:px-12"
          style={{ background: study.heroColor }}
        >
          <div className="max-w-5xl mx-auto w-full">
            <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${mutedColor}`}>
              {study.company} · {study.year}
            </p>
            <RevealText
              as="h1"
              text={study.title}
              className={`text-[clamp(1.9rem,4vw,3.2rem)] font-black tracking-tight leading-[1.08] max-w-3xl mb-8 ${textColor}`}
            />
            <p className={`text-lg leading-relaxed font-light max-w-2xl text-pretty ${study.heroTextLight ? "text-white/70" : "text-[#444]"}`}>
              {study.tldr}
            </p>

            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t ${study.heroTextLight ? "border-white/10" : "border-black/10"}`}>
              {meta.map(m => (
                <div key={m.label}>
                  <p className={`text-xs uppercase tracking-widest mb-1.5 ${mutedColor}`}>{m.label}</p>
                  <p className={`text-sm font-medium leading-snug ${textColor}`}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero image */}
        {study.heroImage && (
          <div className="bg-[#f4f4f4]">
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.08)]">
                <Image
                  src={study.heroImage}
                  alt={`${study.company} ${study.title}`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Metrics bar */}
        <div className="bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-8">
            <div className="flex flex-wrap gap-x-14 gap-y-6">
              {study.metrics.map(m => (
                <div key={m.label}>
                  <p className="text-3xl font-black text-white tracking-tight tabular-nums"><CountUp value={m.value} /></p>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-20 space-y-16">

          {study.context && (
            <Reveal as="section">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-5">Overview</h2>
              <p className="text-lg text-[#333] leading-relaxed font-light text-pretty">{study.context}</p>
            </Reveal>
          )}

          <Reveal as="section">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-5">The problem</h2>
            <p className="text-lg text-[#333] leading-relaxed font-light text-pretty">{study.problem}</p>
          </Reveal>

          {study.goals && study.goals.length > 0 && (
            <Reveal as="section">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-6">Goals</h2>
              <ul className="space-y-4">
                {study.goals.map((g, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-sm font-black text-[#ccc] tabular-nums pt-0.5 shrink-0 w-6">{(i + 1).toString().padStart(2, "0")}</span>
                    <span className="text-[1.05rem] text-[#444] leading-relaxed font-light text-pretty">{g}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {study.insights && study.insights.length > 0 && (
            <Reveal as="section">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-6">What the research told me</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {study.insights.map((ins, i) => (
                  <div key={i} className="rounded-2xl bg-[#fafafa] ring-1 ring-black/[0.06] p-6">
                    {ins.stat && <p className="text-2xl font-black text-[#0a0a0a] tracking-tight mb-2 tabular-nums">{ins.stat}</p>}
                    <p className="text-[0.95rem] text-[#555] leading-relaxed text-pretty">{ins.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Key decisions: alternating text / visual rows (breaks out wider than the reading column) */}
          <section className="w-[100vw] relative left-1/2 -translate-x-1/2 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-10">Key decisions</h2>
              <div className="space-y-16 md:space-y-24">
                {study.approach.map((step, i) => {
                  const text = (
                    <div>
                      <span className="text-sm font-black text-[#ccc] tabular-nums block mb-3">{(i + 1).toString().padStart(2, "0")}</span>
                      <h3 className="text-xl font-bold text-[#0a0a0a] mb-3 text-balance">{step.heading}</h3>
                      <p className="text-[1.05rem] text-[#444] leading-relaxed font-light text-pretty">{step.body}</p>
                    </div>
                  );
                  if (step.pair) {
                    return (
                      <Reveal key={i} as="div">
                        <div className="max-w-2xl mb-10">{text}</div>
                        <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-xl mx-auto">
                          {([["Before", step.pair.before], ["After", step.pair.after]] as const).map(([label, m]) => (
                            <figure key={label}>
                              <figcaption className="text-xs font-bold tracking-[0.15em] uppercase text-[#555] mb-3 text-center">{label}</figcaption>
                              {/* Black bezel: the video's baked-in black corners blend into it */}
                              <div className="rounded-[30px] bg-black p-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_18px_50px_rgba(0,0,0,0.18)]">
                                <div className="rounded-[26px] overflow-hidden">
                                  <Media img={m} />
                                </div>
                              </div>
                            </figure>
                          ))}
                        </div>
                        {step.pair.caption && (
                          <p className="text-sm text-[#999] mt-5 text-center font-light max-w-xl mx-auto">{step.pair.caption}</p>
                        )}
                      </Reveal>
                    );
                  }
                  if (!step.image) {
                    return <Reveal key={i} as="div" className="max-w-2xl">{text}</Reveal>;
                  }
                  if (step.image.full) {
                    return (
                      <Reveal key={i} as="div">
                        <div className="max-w-2xl mb-8">{text}</div>
                        <div className={`${step.image.maxW ?? "max-w-3xl"} mx-auto`}><Figure img={step.image} full={false} /></div>
                      </Reveal>
                    );
                  }
                  const flip = i % 2 === 1;
                  return (
                    <Reveal key={i} as="div" className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
                      <div className={flip ? "md:order-2" : ""}>{text}</div>
                      <div className={flip ? "md:order-1" : ""}>
                        <div className={step.image.maxW ? `${step.image.maxW} mx-auto` : ""}><Figure img={step.image} full={false} /></div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Standalone process images / closing visuals */}
          {study.images.map((img, i) => (
            <Figure key={i} img={img} />
          ))}

          <Reveal as="section">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-5">The outcome</h2>
            <p className="text-lg text-[#333] leading-relaxed font-light text-pretty">{study.outcome}</p>
          </Reveal>

          {study.partners && study.partners.length > 0 && (
            <Reveal as="section">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-3">Backed by</h2>
              <p className="text-[1.05rem] text-[#444] leading-relaxed font-light text-pretty mb-8 max-w-2xl">Film Finder has been supported by an accelerator, mentors and industry partners as we have grown.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-start">
                {study.partners.map(p => (
                  <div key={p.name} className="flex flex-col gap-2">
                    {p.logo && <img src={p.logo} alt={p.name} className="h-8 w-auto object-contain object-left" />}
                    <p className="text-sm font-bold text-[#0a0a0a] leading-tight">{p.name}</p>
                    <p className="text-xs text-[#888] leading-snug">{p.note}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal as="section" className="bg-[#fafafa] rounded-2xl p-8 ring-1 ring-black/[0.06]">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-4">What I would do differently</h2>
            <p className="text-base text-[#555] leading-relaxed text-pretty">{study.learned}</p>
          </Reveal>

          <div className="flex flex-wrap gap-2 pt-2">
            {study.tags.map(tag => (
              <span key={tag} className="inline-flex items-center text-xs font-medium bg-[#f2f2f2] text-[#444] px-3 h-7 rounded-full leading-none">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related + back */}
        <div className="border-t border-[#e8e8e8] max-w-5xl mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <Link href="/#work" className="text-sm font-semibold text-[#0a0a0a] hover:text-[#e63329] transition-colors">
            ← Back to all work
          </Link>
          {study.related && (
            <Link
              href={`/work/${study.related.slug}`}
              className="text-sm font-semibold text-[#0a0a0a] hover:text-[#e63329] transition-colors"
            >
              {study.related.label} →
            </Link>
          )}
        </div>

      </main>
      <Footer />
    </>
  );
}
