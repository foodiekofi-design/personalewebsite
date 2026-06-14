import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";
import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import CountUp from "../../components/CountUp";

type StudyImage = { src: string; caption: string; width?: number; height?: number };
type Insight = { stat?: string; text: string };

type CaseStudy = {
  title: string;
  company: string;
  year: string;
  type: string;
  team: string;
  tools: string;
  platform: string;
  tldr: string;
  metrics: { value: string; label: string }[];
  context?: string;
  problem: string;
  goals?: string[];
  insights?: Insight[];
  approach: { heading: string; body: string }[];
  outcome: string;
  learned: string;
  tags: string[];
  heroColor: string;
  heroTextLight: boolean;
  heroImage: string | null;
  images: StudyImage[];
  related?: { slug: string; label: string };
};

// Order here is the recommended reading order; the home page controls card order.
const caseStudies: Record<string, CaseStudy> = {
  "film-finder": {
    title: "Co-founding a film discovery app and growing it from 0 to 100 weekly users",
    company: "Film Finder",
    year: "2022 to present",
    type: "iOS · Android · Founder",
    team: "Two co-founders. I lead design and ship code.",
    tools: "Figma, React Native, Claude Code, Typeform, Substack",
    platform: "iOS and Android",
    tldr: "Film Finder's early users could not find films that matched their actual taste, only their genre. I redesigned discovery and onboarding and shipped the code alongside my co-founder. Weekly active users grew from around 20 to 100 and the newsletter reached 2,000 subscribers.",
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
        body: "I ran 12 interviews with early users, 22 in total at a 65% response rate. One pattern came up again and again: people do not want more options, they want better guidance.",
      },
      {
        heading: "Cut choice at the right moments",
        body: "I replaced the generic feed with a \"Top 3 For You\" model for fast decisions, and moved deeper browsing into a separate Discover tab so the two jobs stopped fighting each other. Showing only three felt risky, but in testing it did the opposite of what I feared: fewer options raised confidence instead of frustration, as long as Discover was there for people who wanted to keep looking.",
      },
      {
        heading: "Simplified onboarding",
        body: "Genre selection went from poster heavy screens to compact chips that are faster to scan and complete. Onboarding dropped from seven steps to three.",
      },
      {
        heading: "Built the design system and shipped it",
        body: "I built the component library in Figma covering recommendation cards, film detail cards, genre chips and navigation states, then wrote production React Native alongside my co-founder.",
      },
      {
        heading: "Explored social as a discovery aid, not a feed",
        body: "Rather than bolt on generic following, I designed profiles around film identity: what someone has watched, liked, or wants to watch, with shared taste at the centre. Treating social as a way to strengthen recommendations rather than compete with them kept the core decision fast while opening a credible path to stickiness.",
      },
    ],
    outcome:
      "Weekly active users grew from around 20 to 100 after the onboarding redesign. The Substack newsletter reached 2,000 subscribers, and the taste anchored recommendation model became the core of how we position the product.",
    learned:
      "First session experience drives retention more than feature depth. The growth came once we finally simplified onboarding, and I would have done that six months earlier.",
    tags: ["iOS", "Android", "Consumer App", "Founder", "Design Systems"],
    heroColor: "#0a0a0a",
    heroTextLight: true,
    heroImage: "/projects/film-finder.png",
    images: [],
    related: { slug: "film-finder-brand", label: "See the Film Finder brand identity" },
  },
  "film-finder-brand": {
    title: "Building the Film Finder brand from the logo to the shirt",
    company: "Film Finder",
    year: "2022 to present",
    type: "Brand · Identity System",
    team: "Solo. I designed the full identity.",
    tools: "Figma, Illustrator, Blender",
    platform: "Product, web, merch, social",
    tldr: "Streaming brands all look the same: muted, cinematic, dark. As a co-founder I built Film Finder's identity to do the opposite. One bolt, one yellow, a confident voice, working across the app, the site, the merch and social as a single system.",
    metrics: [
      { value: "1", label: "mark, every surface" },
      { value: "5", label: "core brand colours" },
      { value: "0 to 100", label: "weekly users on the brand" },
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
      "Film Finder now has one coherent identity that works from a 1024px App Store icon down to a printed bolt on a shirt. The brand became part of how the product grew, from 20 to around 100 weekly active users and a 2,000 strong newsletter, and it gives the product a recognisable point of view in a category that mostly looks the same.",
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
    related: { slug: "film-finder", label: "See the Film Finder product case study" },
  },
  "ai-workflows": {
    title: "Rebuilding my design process at Gearset with AI coding tools",
    company: "Gearset",
    year: "2024",
    type: "Enterprise · AI Tooling",
    team: "Solo workflow experiment, shared with the design team",
    tools: "Cursor, Claude, Figma, React",
    platform: "Web and enterprise",
    tldr: "Research kept going stale before it became a testable prototype. I rebuilt my own workflow with AI coding tools to close that gap, then documented it for the team. Along the way I designed how customers review changes to AI agents before they deploy them.",
    metrics: [
      { value: "1 day", label: "research to prototype" },
      { value: "15", label: "customers interviewed" },
      { value: "Shared", label: "with the design team" },
    ],
    context:
      "This was a six week exploration of how AI could become part of my actual design process on a complex enterprise problem, not just a tool for ideation. At Gearset I was designing how customers review and deploy Salesforce Agentforce agent and bot data between DevOps environments: a deeply nested, hard to scan model where small changes carried non obvious knock on effects. At the same time, my own research, synthesis and prototyping kept happening in separate stages and leaking context between them. I used the project to solve both at once. Most of the screens in this case study were built in real code, by copying the main repo to a local branch, rather than mocked statically in Figma.",
    problem:
      "There were two problems running at once. For me, research, synthesis and prototyping happened in separate stages and context leaked between them. For Gearset customers, reviewing changes to AI agent and bot data was slow, because the underlying structure was deeply nested and small changes carried knock on effects that were not obvious.",
    goals: [
      "Make complex, nested agent changes legible enough to review and act on with confidence.",
      "Shorten my own loop from research to synthesis to interactive prototype.",
      "Produce a way of working the wider design team could adopt, not just a personal hack.",
    ],
    insights: [
      { stat: "15", text: "customer conversations about friction in complex workflows. The blocker was not missing capability, it was structure that read more clearly to an engineer than to a user." },
      { text: "People hesitated because they could not quickly verify whether what they were seeing was complete, meaningful, or safe to act on. The real problem was confidence, not information." },
    ],
    approach: [
      {
        heading: "Used AI for synthesis, not just ideas",
        body: "I built research databases and used AI to surface recurring themes across 15 customer conversations while they were still fresh, instead of waiting a week to write things up.",
      },
      {
        heading: "Designed for confident review",
        body: "Mirroring the real nested hierarchy was the obvious move, but it tested slowly and was hard to scan. I traded structural accuracy for readability: flatter grouped views, status first, unchanged detail de-emphasised, and changes broken into reviewable units with diff style visibility and approval before anything ran. That trade is what made the review feel safe to act on.",
      },
      {
        heading: "Prototyped in real code",
        body: "Static screens could not test expansion, grouping and progressive reveal, so I built interactive prototypes with AI assisted coding and tested behaviour directly. I kept the calls on what to test, keep or reject.",
      },
    ],
    outcome:
      "I can now go from synthesised research to an interactive prototype in a single session instead of across days. The work produced real interaction models the team could react to early, and I documented the process and shared it with the wider design team.",
    learned:
      "AI helps most when it removes friction, not when it tries to replace thinking. I would also frame this as a team proposal sooner, so the output was less tied to my own setup.",
    tags: ["AI Tooling", "Prototyping", "Enterprise UX", "Design Engineering"],
    heroColor: "#0f1117",
    heroTextLight: true,
    heroImage: "/projects/ai-workflows.png",
    images: [
      { src: "/projects/ai-workflows-diff.png", caption: "Diff style review: changes broken into reviewable units with status visible up front." },
      { src: "/projects/ai-workflows-synthesis.png", caption: "AI assisted synthesis surfacing recurring themes across customer conversations." },
    ],
  },
  "beauhurst-integrations": {
    title: "Designing Beauhurst's first native CRM integration",
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
      },
      {
        heading: "Synced collections, not companies",
        body: "We first planned to sync individual companies, but at scale that would have overloaded the platform. I moved the sync to operate on Collections instead. It scaled cleanly and gave people a clearer mental model: the Collection is the thing that syncs. I also moved the controls out of buried settings into the Collections area, where people already expected them to live.",
      },
      {
        heading: "Removed the busywork",
        body: "Testing showed people did not want to hand pick fields, they wanted all of it. So on first sync we create the Beauhurst fields in HubSpot automatically and drop the field by field checkboxes. We accepted one trade: companies added to a synced Collection appear in the CRM the next day, not instantly, because immediate sync would exceed platform load. Once that was stated clearly in the UI, nobody in testing minded.",
      },
      {
        heading: "Worked end to end with engineering",
        body: "I journey mapped the touchpoints, prototyped from low to high fidelity in Figma, and tested with 20 internal and external users through Maze. Then I wrote the specs, ran the backlog in Notion, and reviewed pull requests on GitHub with the team so the build matched the intent.",
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
    images: [
      { src: "/projects/integrations-heatmap.png", caption: "Usability testing on the mapping flow: 5.6s average to complete, 24% misclick rate before iteration." },
      { src: "/projects/integrations-research.png", caption: "Discovery sessions with existing customers to map the CRM workflows they actually used." },
    ],
  },
  "charges-and-mortgages": {
    title: "Bringing charge and mortgage data into Beauhurst",
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
      },
      {
        heading: "Stopped forcing charges into transactions",
        body: "My first concept tucked charge data inside the existing Transactions tab. Moderated testing with two financier clients and three account managers killed that quickly: people see charges as separate from fundraising events, and mixing them broke their mental model. I gave charges their own dedicated tab, which also made the relationship between charges and mortgages clear.",
      },
      {
        heading: "Made status and history legible",
        body: "A traffic light system shows charge satisfaction at a glance, so you can read risk without opening anything. Detail sits behind modals, using progressive disclosure to avoid overload. For history I redesigned the timeline around a transit map style, which gave people the temporal context to assess risk without reading the underlying legal documents.",
      },
      {
        heading: "Built it to take the next dataset",
        body: "I worked within third party data limits and regulatory definitions, and handed structured specs to engineering. I built it as a system, so later data types could slot into the same search, tab and disclosure patterns rather than being designed from scratch.",
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
    title: "An accessible transport chatbot grounded in real user research",
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
      },
      {
        heading: "Grounded it in real conversations",
        body: "A persona workshop with stakeholders mapped the different users and how each one relied on the service. I then analysed 12 real call centre recordings to shape the chatbot's structure and tone, so it answered the questions people actually phoned in with, not the ones we assumed.",
      },
      {
        heading: "Tested with real needs",
        body: "Six participants with mixed cognitive and visual needs tested the prototype. Three findings drove the redesign: onboarding had to state the chatbot's features up front, people needed reassurance and clarity on departure and arrival times, and difficulty recalling journey details made them fall back on other aids. So I made onboarding spell out what it could do, kept journey information visible instead of buried in the thread, and built a layout that did not force horizontal scrolling even at 400% zoom.",
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
    images: [
      { src: "/projects/translink-heuristics.png", caption: "Heuristic evaluation mapping violations, severity and recommendations across benchmarked apps." },
    ],
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
    { label: "Role", value: "Product Designer" },
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

          <Reveal as="section">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-8">What I did</h2>
            <div className="space-y-8">
              {study.approach.map((step, i) => (
                <div key={i} className="flex gap-5">
                  <span className="text-sm font-black text-[#ccc] tabular-nums pt-1 shrink-0 w-6">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#0a0a0a] mb-2 text-balance">{step.heading}</h3>
                    <p className="text-[1.05rem] text-[#444] leading-relaxed font-light text-pretty">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Process images */}
          {study.images.map(img => (
            <figure key={img.src} className="w-[100vw] relative left-1/2 -translate-x-1/2 px-6 md:px-12">
              <div className="max-w-5xl mx-auto">
                {img.width && img.height ? (
                  <Image
                    src={img.src}
                    alt={img.caption}
                    width={img.width}
                    height={img.height}
                    className="w-full h-auto rounded-xl ring-1 ring-black/10 bg-[#faf9f6]"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                ) : (
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden ring-1 ring-black/10 bg-[#f4f4f4]">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>
                )}
                <figcaption className="text-sm text-[#999] mt-3 text-center font-light">{img.caption}</figcaption>
              </div>
            </figure>
          ))}

          <Reveal as="section">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-5">The outcome</h2>
            <p className="text-lg text-[#333] leading-relaxed font-light text-pretty">{study.outcome}</p>
          </Reveal>

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
