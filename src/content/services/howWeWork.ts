/** The same four steps on the homepage and on every service page. */

export const howWeWork = {
  title: "How we work",
  steps: [
    {
      name: "Brief",
      body: "You tell us what you need. We ask questions until we understand the business behind it.",
      drawing: "discover",
    },
    {
      name: "Proposal",
      body: "You get a written scope, timeline and quote. Nothing starts until you've agreed to it.",
      drawing: "design",
    },
    {
      name: "Build",
      body: "We work in short stages and show you progress as we go, so there are no surprises at the end.",
      drawing: "build",
    },
    {
      name: "Launch and support",
      body: "We put it live, train your team, and stay on for updates and fixes.",
      drawing: "grow",
    },
  ],
} as const;
