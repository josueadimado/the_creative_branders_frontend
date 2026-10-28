import { useEffect, useState } from "react";
import { deskJson } from "../api";
import type { AnalyticsRangeValue } from "./AnalyticsUI";
import type { ActivityItem } from "./sampleData";
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

export type JourneyStep = {
  time: string;
  name: string;
  label: string;
  path: string;
  detail: string;
  created_at: string;
};

export type JourneyItem = {
  visit_id: string;
  started_at: string;
  started_label: string;
  device: string;
  landing_page: string;
  exit_page: string;
  pages: string[];
  page_count: number;
  duration_sec: number;
  event_count: number;
  error_count: number;
  converted: boolean;
  outcome: string;
  outcome_label: string;
  source: string;
  campaign: string;
  referrer: string;
  steps: JourneyStep[];
};

export type JourneysPayload = {
  stats: {
    visits: number;
    converted: number;
    bounced: number;
    with_errors: number;
    avg_duration_sec: number;
    avg_pages: number;
  };
  tips: { title: string; detail: string; severity: string }[];
  top_exit_pages: { path: string; count: number }[];
  common_errors: { message: string; count: number }[];
  items: JourneyItem[];
};

const emptyJourneys: JourneysPayload = {
  stats: {
    visits: 0,
    converted: 0,
    bounced: 0,
    with_errors: 0,
    avg_duration_sec: 0,
    avg_pages: 0,
  },
  tips: [],
  top_exit_pages: [],
  common_errors: [],
  items: [],
};

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
      visit_id?: string;
      device?: string;
      client_ip?: string;
      source?: string;
      campaign?: string;
      referrer?: string;
      landing_page?: string;
      visit_paths?: string[];
    }[];
    journeys?: JourneysPayload;
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

function rangeQuery(range: AnalyticsRangeValue): string {
  const params = new URLSearchParams();
  if (range.preset === "custom" && range.from && range.to) {
    params.set("range", "custom");
    params.set("from", range.from);
    params.set("to", range.to);
  } else if (range.preset === "today") {
    params.set("range", "today");
  } else if (range.preset === "30d") {
    params.set("range", "30d");
  } else {
    params.set("range", "7d");
  }
  return params.toString();
}

export function useDeskAnalytics(range: AnalyticsRangeValue) {
  const [data, setData] = useState<DeskAnalyticsPayload | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (range.preset === "custom" && (!range.from || !range.to)) {
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }
    setLoading(true);
    deskJson<DeskAnalyticsPayload>(`/analytics/?${rangeQuery(range)}`)
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
  }, [range.preset, range.from, range.to]);

  const studio = data?.studio;
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
      visitorsHint: useSampleGa ? sampleOverview.visitorsHint : "GA4",
      sessions: useSampleGa ? sampleOverview.sessions : data?.ga.sessions || 0,
      sessionsHint: useSampleGa
        ? sampleOverview.sessionsHint
        : `${data?.ga.page_views || 0} page views`,
      contactActions: studio?.contact_actions ?? 0,
      contactHint: breakdown
        ? `${breakdown.whatsapp} WA · ${breakdown.start_project} project · ${breakdown.email + breakdown.call + breakdown.audit + breakdown.other} other`
        : "None yet",
      briefs: studio?.briefs ?? 0,
      briefsHint: studio ? `${studio.unread_briefs} unread` : sampleOverview.briefsHint,
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
      pageViewsHint: useSampleGa ? samplePagesMetrics.pageViewsHint : "GA4",
      caseOpens: studio?.case_opens ?? 0,
      caseOpensHint: studio?.work_opens?.length
        ? studio.work_opens
            .slice(0, 2)
            .map((row) => `${row.opens} ${row.slug}`)
            .join(" · ")
        : "None yet",
      attributedBriefs: studio?.briefs ?? 0,
      attributedHint: "From brief landing page",
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
          detail: "Sessions",
          drop: null as number | null,
        },
        {
          title: "Work / services",
          source: "ga4" as const,
          count: useSampleGa
            ? sampleFunnel.steps[1].count
            : data?.ga.work_service_sessions || 0,
          detail: "/work · case study · /services",
          drop: useSampleGa ? 51.6 : null,
        },
        {
          title: "Contact CTA",
          source: "studio" as const,
          count: studio?.contact_actions ?? 0,
          detail: "WhatsApp · project · email · call",
          drop: null,
        },
        {
          title: "Contact or brief",
          source: "studio" as const,
          count: studio?.contact_or_brief ?? 0,
          detail: "CTAs + briefs",
          drop: null,
        },
      ],
    },
    sources: {
      sessions: useSampleGa ? sampleSources.sessions : data?.ga.sessions || 0,
      sessionsHint: useSampleGa ? sampleSources.sessionsHint : "GA4",
      campaignSessions: useSampleGa
        ? sampleSources.campaignSessions
        : data?.ga.campaign_session_total || 0,
      campaignSessionsHint: useSampleGa ? sampleSources.campaignSessionsHint : "With UTM campaign",
      campaignContacts:
        studio?.campaigns.reduce((sum, row) => sum + (row.contacts || 0), 0) ?? 0,
      campaignContactsHint: "Tagged CTA clicks",
      campaignBriefs: studio?.campaigns.reduce((sum, row) => sum + row.briefs, 0) ?? 0,
      campaignBriefsHint: "Tagged briefs",
    },
    channels: useSampleGa ? sampleChannels : data?.ga.channels || [],
    campaigns: liveStudio ? studio?.campaigns || [] : sampleCampaigns,
    activityMetrics: {
      contactActions: studio?.contact_actions ?? 0,
      contactBreakdown: breakdown
        ? `${breakdown.whatsapp} WA · ${breakdown.start_project} project · ${breakdown.email} email · ${breakdown.call} call`
        : liveStudio
          ? "None yet"
          : activityMetrics.contactBreakdown,
      briefs: studio?.briefs ?? 0,
      briefsHint: "Inbox",
      caseOpens: studio?.case_opens ?? 0,
      caseBreakdown: studio?.work_opens?.length
        ? studio.work_opens
            .slice(0, 2)
            .map((row) => `${row.opens} ${row.slug}`)
            .join(" · ")
        : "None yet",
    },
    activityFeed: (liveStudio
      ? (studio?.activity || []).map(
          (row): ActivityItem => ({
            day: row.day,
            time: row.time,
            action: row.action,
            detail: row.detail,
            visit_id: row.visit_id || "",
            device: row.device || "",
            client_ip: row.client_ip || "",
            source: row.source || "",
            campaign: row.campaign || "",
            referrer: row.referrer || "",
            landing_page: row.landing_page || "",
            visit_paths: row.visit_paths || [],
          }),
        )
      : activityFeed) as ActivityItem[],
    topCta: studio?.top_cta || "No contact actions yet",
    journeys: studio?.journeys || emptyJourneys,
  };

  return view;
}
