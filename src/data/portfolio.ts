export type PortfolioItem = {
  id: string;
  client: string;
  sector: string;
  summary: string;
  problem: string;
  approach: string;
  built: string;
  image: string;
};

export const portfolio: PortfolioItem[] = [
  {
    id: "relief-chiropractic",
    client: "Relief Chiropractic",
    sector: "Healthcare",
    summary: "A clinic booking system so patients can take a slot without a phone tag loop.",
    problem:
      "The front desk was the system. Appointments lived in a book, a phone, and whoever was standing at reception. Patients dropped off. Staff spent the morning chasing confirmations instead of preparing rooms.",
    approach:
      "We treated booking as the product, not a form on a brochure site. The flow had to work on a phone, in a noisy waiting area, and for a first-time patient who does not know the difference between an adjustment and a follow-up.",
    built:
      "A clinic booking system: service types, practitioner calendars, reminders, and a simple admin view of the day. Brand and site sit around that system so the clinic looks as organised as the diary now is.",
    image: "/images/work-clinic.jpg",
  },
  {
    id: "secure-counseling",
    client: "Secure Counseling & Psychological Centers",
    sector: "Behavioral health",
    summary: "A session management platform that keeps notes, schedules, and follow-up in one place.",
    problem:
      "Counselors were holding caseloads in their heads and in scattered files. Session notes, next appointments, and who needed a check-in did not live together. That is a risk for care, and a drain on the people doing the work.",
    approach:
      "We designed for privacy and calm first. The interface had to be quiet enough for a clinician between sessions, and strict enough that records stay where they belong. No extra chrome. No theatre.",
    built:
      "A session management platform: calendars, client records, session notes, and follow-up prompts in one login. The public site explains the practice. The product runs the practice.",
    image: "/images/work-counseling.jpg",
  },
  {
    id: "up2date-connect",
    client: "Up2Date Connect",
    sector: "Behavioral health",
    summary: "Real-time case coordination so teams see the same case, at the same time.",
    problem:
      "Cases moved between people faster than the paperwork. A coordinator, a clinician, and a partner organisation could each be working from a different version of the truth. Handoffs leaked. Clients felt it.",
    approach:
      "We mapped the actual path of a case, not an org chart. Then we built a shared board that updates as work happens, so coordination is the default instead of a meeting.",
    built:
      "A real-time case coordination tool: shared case status, assignments, notes, and alerts when something changes. Built for teams who cannot wait until Friday to find out a client fell through.",
    image: "/images/work-ops.jpg",
  },
  {
    id: "come",
    client: "COME",
    sector: "Nonprofit",
    summary: "A leadership website and content platform that can hold programmes, not just a homepage.",
    problem:
      "The work was serious. The site was not. Programmes, stories, and calls to action sat in documents and social posts. Visitors could not see a clear path from conviction to a next step.",
    approach:
      "We built a content system, not a one-off brochure. Pages had to be easy to update as cohorts, events, and teaching material change. The voice stayed institutional. We, not a founder headline.",
    built:
      "A leadership website and content platform: programme pages, a publishing structure for teaching and stories, and a clear way to take part. Partner to the Academy work we still hold with COME.",
    image: "/images/work-nonprofit.jpg",
  },
  {
    id: "come-clarity",
    client: "COME|CLARITY",
    sector: "EdTech",
    summary: "An executive learning platform for cohort pathways, live formation, and alumni, not a pile of videos.",
    problem:
      "Leaders across Africa and the diaspora were being asked to grow from PDFs and generic courses. Conviction was already there. The missing piece was a structured place to practice, with a cohort, and leave with something they could use at work the next morning.",
    approach:
      "We designed around pathways and live cohorts, not a content dump. Application, placement, weekly sessions, and alumni had to feel like one product. The public site had to explain that without sounding like a campus brochure.",
    built:
      "An executive learning platform: formation pathways, cohort application and seating, live-session structure, and a public site that states the offer in plain language. Curriculum copy on the marketing surface stays theirs to own.",
    image: "/images/work-edtech.jpg",
  },
  {
    id: "elevate-tribe-learning",
    client: "Elevate Tribe Learning",
    sector: "EdTech",
    summary: "A mentorship platform where matching, sessions, and progress sit in one product.",
    problem:
      "Mentorship was happening in chats and calendars that did not talk to each other. Mentors could not see a clean picture of who they were holding. Learners could not see the path. The programme was stronger than the tooling.",
    approach:
      "We made the relationship the unit of the product. Profiles, matching, session cadence, and a simple progress view. Brand and UI had to feel like a studio, not a school portal from 2012.",
    built:
      "A mentorship platform: mentor and learner profiles, matching, session booking, and a shared view of the work. Site and product share one identity so the programme looks as considered as the conversations it holds.",
    image: "/images/work-mentorship.jpg",
  },
  {
    id: "elevate-tribe-analytics",
    client: "Elevate Tribe Analytics",
    sector: "Data / training",
    summary: "A data and training services site that explains the offer without drowning people in charts.",
    problem:
      "The team could do the work. The website could not say so. Prospects had to infer capability from a thin page. Training offers and analytics services blurred into each other.",
    approach:
      "We split the story: what you hire them for, how an engagement runs, and what a training track looks like. Visuals stay spare. Numbers on the site are only the ones they are ready to stand behind.",
    built:
      "A data and training services site: clear service lines, a path into an engagement, and a visual system that reads as intelligence work, not generic consulting.",
    image: "/images/work-analytics.jpg",
  },
  {
    id: "uplift-your-morning",
    client: "Uplift Your Morning",
    sector: "Faith / community",
    summary: "A devotion and community platform for a daily rhythm, not a dump of posts.",
    problem:
      "The practice was daily. The tools were not. Devotionals, discussion, and belonging lived across apps. People who needed a quiet morning kept getting a noisy feed.",
    approach:
      "We designed for a short, repeatable ritual: something to read, a way to sit with it, a way to stay in community without scrolling for an hour. Tone stayed warm. The product stayed small.",
    built:
      "A devotion and community platform: daily content, a simple community layer, and a public presence that matches the practice. Built to be opened in the morning, then put down.",
    image: "/images/work-faith.jpg",
  },
  {
    id: "twi-learning-center",
    client: "Twi Learning Center Ghana",
    sector: "Education",
    summary: "A course and enrollment site for Twi and Fante, in person and online, with a path that is easy to start.",
    problem:
      "People in Ghana and in the diaspora wanted structured Twi and Fante, not a random tutor chat. Courses existed. Getting from “I want to learn” to a paid seat was still friction: packages, kids vs adults, in-person vs virtual, all explained in too many places.",
    approach:
      "We organised the catalogue the way a new student thinks: language, level, format, then enroll. Tutors and testimonials support the decision. The site had to work for a traveller on a phone and a parent booking a child.",
    built:
      "A course and enrollment site: Twi and Fante tracks, group and one-to-one options, in-person and virtual, and a clear checkout into the next class. Copy stays theirs. The structure is ours.",
    image: "/images/work-twi.jpg",
  },
];
