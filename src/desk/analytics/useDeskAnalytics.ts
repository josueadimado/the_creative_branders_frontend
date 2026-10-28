import { useEffect, useState } from "react";
import { deskJson } from "../api";
import type { DateRange } from "./sampleData";
import {
  activityFeed,
  activityMetrics,
  campaigns as sampleCampaigns,
  channels as sampleChannels,
  contactDaily as sampleContactDaily,
  funnel as sampleFunnel,
  overviewMetrics as sampleOverview,
  pageRows as samplePageRows,
  pagesMetrics as samplePagesMetrics,
  sourcesMetrics as sampleSources,
  topPages as sampleTopPages,
  visitorDaily as sampleVisitorDaily,
  workOpens as sampleWorkOpens,
} from "./sampleData";

export type DeskAnalyticsPayload = {
  range: string;
  ga_connected: boolean;
  sample_traffic: boolean;
  updated_at: string;
  studio: {
    contact_actions: number;
    contact_breakdown: {
      whatsapp: number;
      start_project: number;
      email: number;
      call: number;
      audit: number;
      other: number;
    };
    briefs: number;
    unread_briefs: number;
    case_opens: number;
    contact_or_brief: number;
    contact_daily: { label: string; value: number }[];
    top_cta: string;
    work_opens: { slug: string; opens: number; briefs: number; gaViews: number }[];
    page_rows: {
      path: string;
      views: number;
      studioCount: number;
      studioLabel: string;
      briefs: number;
      kind: "all" | "case" | "insights" | "marketing";
    }[];
    campaigns: {
      source: string;
      medium: string;
      campaign: string;
      sessions: number;
      contacts?: number;
      briefs: number;
    }[];
    activity: {
      day: string;
      time: string;
      action: string;
      name: string;
      detail: string;
      created_at: string;
    }[];
  };
  ga: {
    visitors: number;
    sessions: number;
    page_views: number;
    visitor_daily: { label: string; value: number }[];
    top_pages: { path: string; views: number; briefs: number }[];
    channels: { name: string; sessions: number; briefs: number }[];
    work_service_sessions?: number;
    campaign_session_total?: number;
  };
  ga_error?: string;
};

function rangeQuery(range: DateRange): string {
  if (range === "today") return "today";
  if (range === "30d") return "30d";
  return "7d";
}

export function useDeskAnalytics(range: DateRange) {
  const [data, setData] = useState<DeskAnalyticsPayload | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    deskJson<DeskAnalyticsPayload>(`/analytics/?range=${rangeQuery(range)}`)
      .then((payload) => {
        if (!cancelled) {
          setData(payload);
          setError("");
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load analytics.");
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [range]);

  const studio = data?.studio;
  // Sample GA numbers only while Google is disconnected. Once the API answers, never
  // fill empty studio charts with fake rows — show real zeros / empty lists instead.
  const useSampleGa = Boolean(data) && data?.ga_connected !== true;
  const liveStudio = Boolean(data);
  const breakdown = studio?.contact_breakdown;

  const view = {
    loading,
    error,
    gaConnected: data?.ga_connected === true,
    gaError: data?.ga_error || "",
    sampleTraffic: useSampleGa,
    updatedAt: data?.updated_at,
    overview: {
      visitors: useSampleGa ? sampleOverview.visitors : data?.ga.visitors || 0,
      visitorsHint: useSampleGa ? sampleOverview.visitorsHint : "From GA4 for this range",
      sessions: useSampleGa ? sampleOverview.sessions : data?.ga.sessions || 0,
      sessionsHint: useSampleGa
        ? sampleOverview.sessionsHint
        : `${data?.ga.page_views || 0} page views in this range`,
      contactActions: studio?.contact_actions ?? 0,
      contactHint: breakdown
        ? `${breakdown.whatsapp} WhatsApp · ${breakdown.start_project} Start a project · ${breakdown.email + breakdown.call + breakdown.audit + breakdown.other} other`
        : "No contact actions yet",
      briefs: studio?.briefs ?? 0,
      briefsHint: studio
        ? `${studio.unread_briefs} unread · live studio log`
        : sampleOverview.briefsHint,
    },
    visitorDaily: useSampleGa ? sampleVisitorDaily : data?.ga.visitor_daily || [],
    contactDaily: liveStudio ? studio?.contact_daily || [] : sampleContactDaily,
    topPages: useSampleGa
      ? sampleTopPages
      : (data?.ga.top_pages || []).map((row) => ({
          ...row,
          briefs: studio?.page_rows.find((item) => item.path === row.path)?.briefs || 0,
        })),
    workOpens: liveStudio ? studio?.work_opens || [] : sampleWorkOpens,
    pagesMetrics: {
      pageViews: useSampleGa ? samplePagesMetrics.pageViews : data?.ga.page_views || 0,
      pageViewsHint: useSampleGa ? samplePagesMetrics.pageViewsHint : "From GA4",
      caseOpens: studio?.case_opens ?? 0,
      caseOpensHint: studio?.work_opens?.length
        ? studio.work_opens
            .slice(0, 2)
            .map((row) => `${row.opens} ${row.slug}`)
            .join(" · ")
        : "No case study opens yet",
      attributedBriefs: studio?.briefs ?? 0,
      attributedHint: "Landing page saved with each brief",
    },
    pageRows: liveStudio ? studio?.page_rows || [] : samplePageRows,
    funnel: {
      sessions: useSampleGa ? sampleFunnel.sessions : data?.ga.sessions || 0,
      contactOrBrief: studio?.contact_or_brief ?? 0,
      briefsOnly: studio?.briefs ?? 0,
      steps: [
        {
          title: "Visited site",
          source: "ga4" as const,
          count: useSampleGa ? sampleFunnel.steps[0].count : data?.ga.sessions || 0,
          detail: "Sessions with a site visit",
          drop: null as number | null,
        },
        {
          title: "Viewed work / services",
          source: "ga4" as const,
          count: useSampleGa
            ? sampleFunnel.steps[1].count
            : data?.ga.work_service_sessions || 0,
          detail: "Sessions with /work, a case study, or /services",
          drop: useSampleGa ? 51.6 : null,
        },
        {
          title: "Clicked a contact CTA",
          source: "studio" as const,
          count: studio?.contact_actions ?? 0,
          detail: "WhatsApp + Start a project + email + call",
          drop: null,
        },
        {
          title: "Opened contact or sent brief",
          source: "studio" as const,
          count: studio?.contact_or_brief ?? 0,
          detail: "Contact CTAs + submitted briefs (combined studio signal)",
          drop: null,
        },
      ],
    },
    sources: {
      sessions: useSampleGa ? sampleSources.sessions : data?.ga.sessions || 0,
      sessionsHint: useSampleGa ? sampleSources.sessionsHint : "From GA4",
      campaignSessions: useSampleGa
        ? sampleSources.campaignSessions
        : data?.ga.campaign_session_total || 0,
      campaignSessionsHint: useSampleGa
        ? sampleSources.campaignSessionsHint
        : "Sessions with a named UTM campaign",
      campaignContacts:
        studio?.campaigns.reduce((sum, row) => sum + (row.contacts || 0), 0) ?? 0,
      campaignContactsHint: "WhatsApp / CTA clicks that still carried the campaign tags",
      campaignBriefs: studio?.campaigns.reduce((sum, row) => sum + row.briefs, 0) ?? 0,
      campaignBriefsHint: "Briefs that arrived with UTM tags on the form",
    },
    channels: useSampleGa ? sampleChannels : data?.ga.channels || [],
    campaigns: liveStudio ? studio?.campaigns || [] : sampleCampaigns,
    activityMetrics: {
      contactActions: studio?.contact_actions ?? 0,
      contactBreakdown: breakdown
        ? `${breakdown.whatsapp} WhatsApp · ${breakdown.start_project} project · ${breakdown.email} email · ${breakdown.call} call`
        : liveStudio
          ? "No contact actions yet"
          : activityMetrics.contactBreakdown,
      briefs: studio?.briefs ?? 0,
      briefsHint: "Saved lead content stays in Inbox",
      caseOpens: studio?.case_opens ?? 0,
      caseBreakdown: studio?.work_opens?.length
        ? studio.work_opens
            .slice(0, 2)
            .map((row) => `${row.opens} ${row.slug}`)
            .join(" · ")
        : "No case study opens yet",
    },
    activityFeed: liveStudio
      ? (studio?.activity || []).map((row) => ({
          day: row.day,
          time: row.time,
          action: row.action,
          detail: row.detail,
        }))
      : activityFeed,
    topCta: studio?.top_cta || "No contact actions yet",
  };

  return view;
}
