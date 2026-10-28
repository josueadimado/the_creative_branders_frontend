/**
 * Sample analytics for Desk, matching the Figma mock (21–27 Oct 2026).
 * Real GA4 + studio-event APIs can replace this later; the UI reads this shape.
 */

export type DateRange = "today" | "7d" | "30d" | "custom";

export type Provenance = "ga4" | "studio";

export const sampleRangeLabel = "21–27 Oct 2026";
export const sampleUpdated = "Updated 2 min ago";

export const overviewMetrics = {
  visitors: 420,
  visitorsHint: "48 → 64 visitors per day",
  sessions: 512,
  sessionsHint: "936 page views this week",
  contactActions: 38,
  contactHint: "18 WhatsApp · 12 Start a project · 8 other",
  briefs: 6,
  briefsHint: "3 unread · 1 new today",
};

export const visitorDaily = [
  { label: "21 Oct", value: 48 },
  { label: "22", value: 55 },
  { label: "23", value: 62 },
  { label: "24", value: 44 },
  { label: "25", value: 71 },
  { label: "26", value: 76 },
  { label: "27", value: 64 },
];

export const contactDaily = [
  { label: "21 Oct", value: 4 },
  { label: "22", value: 5 },
  { label: "23", value: 6 },
  { label: "24", value: 3 },
  { label: "25", value: 7 },
  { label: "26", value: 8 },
  { label: "27", value: 5 },
];

export const topPages = [
  { path: "/", views: 320, briefs: 2 },
  { path: "/work", views: 210, briefs: 1 },
  { path: "/contact", views: 126, briefs: 1 },
  { path: "/work/elevate-tribe-analytics", views: 110, briefs: 2 },
];

export const workOpens = [
  { slug: "elevate-tribe-analytics", opens: 46, briefs: 2, gaViews: 110 },
  { slug: "secure-counseling", opens: 28, briefs: 0, gaViews: 84 },
];

export const devices = { mobile: 294, desktop: 105, tablet: 21 };
export const countries = [
  { name: "Ghana", count: 315 },
  { name: "UK", count: 42 },
  { name: "US", count: 35 },
  { name: "other", count: 28 },
];

export const pagesMetrics = {
  pageViews: 936,
  pageViewsHint: "Across 7 published pages",
  caseOpens: 74,
  caseOpensHint: "46 elevate-tribe-analytics · 28 secure-counseling",
  attributedBriefs: 6,
  attributedHint: "Landing page saved with each brief",
};

export type PageRow = {
  path: string;
  views: number;
  studioLabel: string;
  studioCount: number;
  briefs: number;
  kind: "all" | "case" | "insights" | "marketing";
};

export const pageRows: PageRow[] = [
  { path: "/", views: 320, studioLabel: "home contact CTAs", studioCount: 12, briefs: 2, kind: "marketing" },
  { path: "/work", views: 210, studioLabel: "work filters", studioCount: 9, briefs: 1, kind: "marketing" },
  { path: "/contact", views: 126, studioLabel: "contact opens", studioCount: 18, briefs: 1, kind: "marketing" },
  { path: "/work/elevate-tribe-analytics", views: 110, studioLabel: "case study opens", studioCount: 46, briefs: 2, kind: "case" },
  { path: "/work/secure-counseling", views: 84, studioLabel: "case study opens", studioCount: 28, briefs: 0, kind: "case" },
  { path: "/services", views: 72, studioLabel: "service CTAs", studioCount: 4, briefs: 0, kind: "marketing" },
  { path: "/insights", views: 14, studioLabel: "insight opens", studioCount: 0, briefs: 0, kind: "insights" },
];

export const funnel = {
  sessions: 512,
  contactOrBrief: 24,
  briefsOnly: 6,
  steps: [
    {
      title: "Visited site",
      source: "ga4" as Provenance,
      count: 512,
      detail: "Sessions with a site visit",
      drop: null as number | null,
    },
    {
      title: "Viewed work / services",
      source: "ga4" as Provenance,
      count: 248,
      detail: "Sessions with /work, a case study, or /services",
      drop: 51.6,
    },
    {
      title: "Clicked a contact CTA",
      source: "studio" as Provenance,
      count: 38,
      detail: "WhatsApp + Start a project + email + call",
      drop: 84.7,
    },
    {
      title: "Opened contact or sent brief",
      source: "studio" as Provenance,
      count: 24,
      detail: "Contact-page opens + submitted briefs (combined)",
      drop: 36.8,
    },
  ],
};

export const sourcesMetrics = {
  sessions: 512,
  sessionsHint: "5 mutually exclusive channel groups",
  campaignSessions: 32,
  campaignSessionsHint: "Sessions with a named UTM campaign",
  campaignBriefs: 3,
  campaignBriefsHint: "Of 6 total briefs — saved form attribution",
};

export const channels = [
  { name: "Direct", sessions: 180, briefs: 1 },
  { name: "Organic", sessions: 156, briefs: 1 },
  { name: "Social", sessions: 96, briefs: 0 },
  { name: "Referral", sessions: 48, briefs: 1 },
  { name: "Campaign", sessions: 32, briefs: 3 },
];

export const campaigns = [
  {
    source: "instagram",
    medium: "social",
    campaign: "studio-refresh",
    sessions: 18,
    briefs: 2,
  },
  {
    source: "linkedin",
    medium: "social",
    campaign: "work-that-works",
    sessions: 10,
    briefs: 1,
  },
  {
    source: "newsletter",
    medium: "email",
    campaign: "october-notes",
    sessions: 4,
    briefs: 0,
  },
];

export const activityMetrics = {
  contactActions: 38,
  contactBreakdown: "18 WhatsApp · 12 project · 5 email · 3 call",
  briefs: 6,
  briefsHint: "Saved lead content stays in Inbox",
  caseOpens: 74,
  caseBreakdown: "46 elevate-tribe-analytics · 28 secure-counseling",
};

export type ActivityItem = {
  day: string;
  time: string;
  action: string;
  detail: string;
  briefId?: number;
};

export const activityFeed: ActivityItem[] = [
  {
    day: "Today · 27 Oct",
    time: "10:42",
    action: "Brief submitted",
    detail: "Brand and websites · GHS · studio-refresh",
    briefId: 1,
  },
  {
    day: "Today · 27 Oct",
    time: "10:35",
    action: "WhatsApp",
    detail: "floating · /work/secure-counseling",
  },
  {
    day: "Today · 27 Oct",
    time: "10:31",
    action: "Case study view",
    detail: "elevate-tribe-analytics",
  },
  {
    day: "Today · 27 Oct",
    time: "09:58",
    action: "Start a project",
    detail: "navbar · /",
  },
  {
    day: "Today · 27 Oct",
    time: "09:44",
    action: "Work filter",
    detail: "Brand identity · /work",
  },
  {
    day: "Yesterday · 26 Oct",
    time: "17:26",
    action: "Email",
    detail: "footer · /contact",
  },
  {
    day: "Yesterday · 26 Oct",
    time: "16:12",
    action: "Brief submitted",
    detail: "Website · GHS · work-that-works",
    briefId: 2,
  },
  {
    day: "Yesterday · 26 Oct",
    time: "15:48",
    action: "Audit request clicked",
    detail: "inline · /insights",
  },
];

export const dashboardSample = {
  latestAction: "10:42 · Brief submitted · Brand and websites · GHS",
  topCta: "WhatsApp floating · 18",
};
