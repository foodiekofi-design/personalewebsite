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
type StudyImage = { src: string; caption: string; width?: number; height?: number; placeholder?: boolean; ratio?: string; full?: boolean; maxW?: string; bare?: boolean };
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
  heroRatio?: string;
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
  const isSvg = /\.svg$/i.test(img.src);
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
      ) : isSvg ? (
        <div className={`${img.maxW ?? "max-w-md"} mx-auto`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt={img.caption} className="block w-full h-auto" />
        </div>
      ) : img.width && img.height ? (
        <Image
          src={img.src}
          alt={img.caption}
          width={img.width}
          height={img.height}
          className={`w-full h-auto rounded-xl ${img.bare ? "" : "ring-1 ring-black/10 bg-[#faf9f6]"}`}
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
    title: "Growing a film-discovery app I co-founded from 20 to 70-100 weekly users",
    company: "Film Finder",
    year: "2024 to present",
    type: "iOS · Android · Founder",
    role: "Co-founder · Design and code",
    team: "Co-founder leading design and shipping code, alongside a developer and a product manager.",
    tools: "Figma, Figma MCP, Claude, React Native, Typeform, Miro",
    platform: "iOS and Android",
    tldr: "Film Finder's early users could not find films that matched their actual taste, only their genre. I redesigned discovery and onboarding and shipped front-end code myself. Weekly active users grew from around 20 to 70-100 and the newsletter reached 2,000 subscribers.",
    metrics: [
      { value: "70-100", label: "weekly active users, up from 20" },
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
        heading: "Prioritised by impact and effort",
        body: "We had more ideas than a small team could build: mood-based recommendations, AI-driven recs, and personalisation from viewing history or explicit preferences. In a team workshop we weighed each one against impact, effort and feasibility, using lenses like RICE and MoSCoW, then committed to the high-impact, low-effort work first. That is why we shipped the Top 3 home, simpler onboarding and Shuffle before the bigger AI features. With a small team, backing the fast wins was how the redesign actually shipped and moved the numbers.",
        image: { src: "/projects/film-finder/ideation-workshop.png", width: 7789, height: 4668, full: true, maxW: "max-w-5xl", caption: "The ideation workshop: ideas generated from the research themes, then weighed against impact, effort and feasibility to decide what to build in the next five weeks." },
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
      "Weekly active users grew from around 20 to 70-100 a week after the redesign, and the Substack newsletter reached 2,000 subscribers, part of a wider community of over 7,000 across our socials, newsletter and the monthly film club we run. The taste anchored recommendation model became the core of how we position the product, and we are now rolling it out in a modern liquid-glass style with a matching marketing site.",
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
    title: "A brand for deciding",
    company: "Film Finder",
    year: "2024 to present",
    type: "Brand · Identity System · Product",
    role: "Co-founder and Chief Design Officer",
    team: "Built with my co-founders Samuel (CEO) and Waed (CTO). I led brand and design.",
    tools: "Figma, Illustrator, Blender",
    platform: "Product, web, merch, social",
    tldr: "Identity, design system and product brand for a film-discovery app that stops decision fatigue. One bolt, one yellow, one voice, built to hold from the App Store icon to a printed shirt.",
    metrics: [
      { value: "70-100", label: "weekly active users, up from 20" },
      { value: "2,000+", label: "Substack followers" },
      { value: "Live", label: "on the App Store worldwide" },
    ],
    context:
      "The films are there. The deciding is the problem. Streaming fragmented the way we watch: couples burn 45 minutes scrolling before anyone presses play, and groups end up with something no one actually wanted. Analysis paralysis is the enemy of movie night. Film Finder exists to compress the gap between intention and watching, and my job was to build the brand that makes that promise feel real.",
    problem:
      "The product had a sharp promise, find films at lightning speed, but no identity carrying it. Every brand in the category hides in the same muted, cinematic dark, so blending in meant disappearing. The identity had to feel as fast and decisive as the product, and hold up everywhere from an App Store icon to a t-shirt.",
    goals: [
      "Shorten a 45 minute decision so it feels closer to 45 seconds.",
      "Refuse the dark, cinematic category look and stand out on sight.",
      "Build one system tight enough to run from the logo to the copy to the merch.",
    ],
    approach: [
      {
        heading: "Ran the whole brand on three words",
        body: "Speed, taste, decisiveness. Every decision, from the logo to the copy to the Shuffle animation, gets measured against them. An identity has to be loud enough to refuse what the category assumes.",
        image: { src: "/projects/brand/Chips.svg", maxW: "max-w-xs", caption: "Speed, taste, decisiveness: the three words every brand decision is measured against." },
      },
      {
        heading: "One bolt. One yellow. No apologies.",
        body: "Streaming lives in muted prestige. Film Finder deliberately rejects that visual language. The brand is the light in the room, not the screen on the wall, so it stands out instantly in a feed of black thumbnails.",
        image: { src: "/projects/brand/statement.png", width: 4320, height: 2598, full: true, caption: "The identity in one line: one bolt, one yellow, no apologies." },
      },
      {
        heading: "Why yellow, why a bolt",
        body: "Film Finder had to look like the app you open when the TV has already failed you. Yellow is urgency: cabs, caution tape, warnings. The bolt is kinetic, a little arcade, a little hazard symbol, sitting outside the premium cinema language the category owns. Closer to a Nintendo cartridge or a Nike kit than a streamer.",
        image: { src: "/projects/brand/Frame.svg", maxW: "max-w-lg", caption: "The category and the refusal: Netflix, HBO, Disney and Apple in muted dark, Film Finder in #F9D61B yellow." },
      },
      {
        heading: "One mark, many surfaces",
        body: "The bolt is the constant. Its form never changes, but the background adapts to context: black gradient for the default iOS icon, solid yellow for brand moments, darker tones for editorial. One rule keeps it sharp: yellow is never tinted, it is #F9D61B or nothing.",
        image: { src: "/projects/brand/logo-grid.svg", maxW: "max-w-sm", caption: "The bolt across contexts: the same mark, different backgrounds, always recognisable." },
      },
      {
        heading: "Named colour by job, not by hue",
        body: "Yellow signals action, warm ink carries text. Tokens are named by function, so when a surface changes role the system follows instead of breaking, and there is always a colour combination ready.",
        image: { src: "/projects/brand/colour-tokens.svg", full: true, maxW: "max-w-4xl", caption: "The live colour system: tokens named by the job they do, not the hue they are." },
      },
      {
        heading: "One type family, every surface",
        body: "Switzer runs across display, marketing and product, with SF Pro for in-product UI. Weight and size create hierarchy while the typeface stays constant, so the brand reads clearly from App Store banners down to the smallest caption.",
        image: { src: "/projects/brand/type-specimen.svg", full: true, maxW: "max-w-4xl", caption: "Switzer across display, section and body weights." },
      },
      {
        heading: "Gave it a voice: fast, direct, unapologetic",
        body: "The copy never narrates or over-explains, which keeps the product feeling quick. We don't curate, we pick. The same voice runs from the App Store listing to the newsletter.",
        image: { src: "/projects/brand/voice.svg", full: true, maxW: "max-w-4xl", caption: "Voice, do and don't: how the brand talks about films." },
      },
      {
        heading: "In product",
        body: "Top 3 is the brand idea made interface: reduce choice to raise confidence and speed up the decision.",
        image: { src: "/projects/brand/in-product.jpg", width: 2688, height: 1618, full: true, maxW: "max-w-4xl", caption: "The brand as interface: the Top 3 home, Discover and profile on device." },
      },
      {
        heading: "On the App Store",
        body: "The frames sit on brand yellow so the cinematic blacks of the device photography carry the journey. The assets communicate value instantly: speed and clarity, matching the core promise.",
        image: { src: "/projects/brand/app-store.jpg", width: 2688, height: 1328, full: true, maxW: "max-w-4xl", caption: "App Store assets on brand yellow." },
      },
      {
        heading: "On the web",
        body: "Where the app is loud, the site is confident. It leads with the tagline at scale, drops the bolt into the nav, and uses mockups as proof.",
        image: { src: "/projects/brand/website.jpg", width: 2688, height: 2387, full: true, maxW: "max-w-4xl", caption: "The marketing site: confident, tagline first, bolt in the nav." },
      },
      {
        heading: "A shirt, to match the bag",
        body: "The brand implies a community, so it had to live on real things. Some merch has shipped, some is in production, and every piece earns the same mark.",
        image: { src: "/projects/brand/merch.jpg", width: 2688, height: 1705, full: true, maxW: "max-w-4xl", bare: true, caption: "Merch: the bolt printed on real things." },
      },
      {
        heading: "Social",
        body: "The same brand and voice carried across our TikTok and Instagram, from explainers on why we built Film Finder to street interviews about how people actually pick films.",
        image: { src: "/projects/brand/social.jpg", width: 2688, height: 1597, full: true, maxW: "max-w-4xl", caption: "Our social presence: the brand and voice across TikTok and Instagram." },
      },
      {
        heading: "Built to grow: an expanded family of accents",
        body: "A monthly campaign concept. Three films, one mood, one poster set. Each edition gets its own accent colour so the system can breathe across the calendar without ever losing the yellow at brand level. A system that only describes today is a snapshot, this is how the brand grows without a rebrand.",
        image: { src: "/projects/brand/campaign.jpg", width: 2688, height: 1286, full: true, maxW: "max-w-4xl", caption: "Proposed campaign system: three films, one mood, a fresh accent each month." },
      },
    ],
    outcome:
      "Film Finder now has one coherent identity that runs from a 1024px App Store icon down to a printed bolt on a shirt, and it is live on the App Store worldwide. The brand became part of how the product grew, from around 20 to between 70 and 100 weekly active users after the redesign, with a 2,000 strong Substack and a 7,000 strong community across our socials and the monthly film club we run. It gives the product a recognisable point of view in a category that mostly looks the same.",
    learned:
      "My biggest takeaway: the brand was never the logo. It is the Shuffle dice, the empty states, the way we write a film description. The mark is maybe 1 percent of it. The rest is a hundred small decisions, and keeping those consistent is what made Film Finder feel like a brand rather than an app with a nice icon.",
    tags: ["Brand Identity", "Design Systems", "Art Direction", "Founder"],
    heroColor: "#1b2436",
    heroTextLight: true,
    heroImage: "/projects/brand/identity-hero.png",
    heroRatio: "2 / 1",
    images: [],
    partners: [
      { name: "Barclays", note: "Funding through their accelerator programme", logo: "/projects/film-finder/partners/barclays.png" },
      { name: "Sky", note: "Leadership and mentorship", logo: "/projects/film-finder/partners/sky.png" },
      { name: "Everyman", note: "Partner for our monthly film clubs", logo: "/projects/film-finder/partners/everyman.png" },
      { name: "University of Southampton", note: "Internship partnership", logo: "/projects/film-finder/partners/southampton.png" },
    ],
    related: { slug: "film-finder", label: "See the Film Finder product case study" },
  },
  "ai-workflows": {
    title: "Designing AI agent deployment at Gearset, prototyped in code",
    company: "Gearset",
    year: "2025 to present",
    type: "Enterprise · AI Agent Tooling",
    role: "UX Designer, front-end prototyping in code",
    team: "Me (designer), a product manager, a dev team lead and a full-stack engineer.",
    tools: "Figma, Claude Code, React, TypeScript, Storybook",
    platform: "Web · Salesforce DevOps",
    tldr: "Gearset helps teams deploy Salesforce's newest AI products: Agentforce agents and Data 360. Agentic data is complex, versioned, and easy to get wrong. I own how teams deploy it safely, and I prototype the front end in the product's real code, so engineering builds on a working branch instead of rebuilding from a static mockup.",
    metrics: [
      { value: "Now live", label: "Agent Script visualiser, publicly launched 2026" },
      { value: "Metadata as a table", label: "agent data readable, not raw IDs" },
      { value: "Prototyped in code", label: "front end in the real codebase, not mockups" },
    ],
    context:
      "Gearset is the leading Salesforce DevOps platform. I design how teams deploy Salesforce's newest AI products: Agentforce agents and the Data 360 platform. The hard part is how they are stored. An agent's logic lives as dense, nested metadata, raw XML and config rather than anything a person can read, so when a team goes to deploy a change from one org to another, they cannot easily see what the agent does or what has changed, and a wrong move can break a live agent. I turn that raw data into a clear, human-readable interface inside Gearset, so people can read a change at a glance and deploy it safely between orgs. How I work depends on the problem: pen and paper for quick ideation, Claude for higher-fidelity concepts, and for something this complex and interactive, a coded prototype built with Claude Code in the product's own design system. That means I hand engineering a working branch to build on, not a static mockup.",
    problem:
      "The real problem was not a lack of information, it was a lack of clarity at the moment of a high-stakes decision. The agent metadata is dense, nested and versioned, so read raw you cannot quickly tell what a change does or which version you are even looking at. Get it wrong, and you can break a live production agent that customers are interacting with, or take down a live data flow. Both admins and developers need to deploy these changes, so those were the two user personas I was solving for: admins who point and click, and developers who live in code. And the platform underneath keeps moving, with Salesforce shipping new agent formats every few months.",
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
        heading: "Grounded the work in real customer research",
        body: "I ran conversations with 15 customers about where complex deployments break down, then built a structured research database, one record per customer tagged by persona, topic and painpoint, so the synthesis was systematic rather than anecdotal. I used AI to pull recurring themes across sessions instead of re-reading every note by hand, turning over 130 tagged insights into six themes. The through-line held across all of them: people were not short on information, they were short on clarity in the moment they had to act.",
        image: { placeholder: true, ratio: "16/9", src: "/projects/ai-workflows/research-synthesis.png", caption: "Pattern analysis: 130+ tagged customer insights synthesised into six themes (customer names removed)." },
      },
      {
        heading: "Prototyped in code, in the product's real design system",
        body: "Instead of handing over static mockups, I build working front-end prototypes in real code, using the product's own components and design tokens. When it is ready I push the branch for engineering to build on, so they start from real, working code rather than rebuilding from a picture. It also lets me test how something actually behaves, which a flat mockup can't.",
        image: { placeholder: true, ratio: "16/9", src: "/projects/ai-workflows/prototype-in-code.png", caption: "A before/after or diagram: static mockup vs a working prototype built from real components. Recreate this yourself as a generic illustration, do not use internal product screenshots." },
      },
      {
        heading: "Gave the whole team real-component prototyping",
        body: "I connected our codebase's design system to an AI-assisted design workflow, so the team, including PMs, could prototype with the real components and tokens instead of throwaway boxes. Ideas got tried in the product's actual visual language before engineering time was spent, which raised the quality of what we debated.",
        image: { placeholder: true, ratio: "16/9", src: "/projects/ai-workflows/real-component-workflow.png", caption: "Your own diagram of the workflow: design system to AI-assisted prototyping to anyone on the team prototyping with real components. This is fully your method, safe to show." },
      },
      {
        heading: "Chose legibility over mirroring the system",
        body: "The core tension was structural accuracy versus usability. My first exploration followed the underlying hierarchy exactly. It was technically correct and too slow to use, with the changes that mattered buried in layers. I made the call to prioritise legibility instead: a flatter, grouped structure, the important state surfaced first, unchanged detail played down, and depth revealed only when someone needs it. The bar was simple, you can look at a change and understand it before you act.",
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
      "The Agent Script visualiser and versioning shipped, and Gearset announced it publicly in April 2026. It made deploying and understanding the dense metadata behind AI agents far easier: teams can read Agent Script metadata as a structured table, move through its subsections, and switch between versions from one place, instead of comparing raw IDs by hand. My focus then moved from proving the concept to strengthening the deployment workflow around it.",
    learned:
      "Two things I carry into every project like this now. On a surface where a bad change has real consequences, making risk visible and mistakes recoverable has to be a first-class design goal from the start, not a pass at the end. And prototyping in code changes the conversation itself: a real, interactive artifact settles the debates that static mockups only prolong, and it means engineering builds on my front-end work rather than rebuilding it from a picture.",
    tags: ["AI Agent Tooling", "Design Engineering", "Prototyping in Code", "Enterprise UX", "Design Systems"],
    heroColor: "#0f1117",
    heroTextLight: true,
    heroImage: "/projects/ai-workflows/cover.jpg",
    heroRatio: "672 / 379",
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
      "With complex data, the hard part is making the meaning clear without dumbing down the structure. People's mental models of debt and risk turned out to matter more than the underlying schema, and designing to how they actually think is what made the legal detail usable.",
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
              <div className="relative w-full rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.08)]" style={{ aspectRatio: (study.heroRatio ?? "16 / 10").replace(/\s*\/\s*/g, " / ") }}>
                <Image
                  src={study.heroImage}
                  alt={`${study.company} ${study.title}`}
                  fill
                  className={study.heroRatio ? "object-contain" : "object-cover object-top"}
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
