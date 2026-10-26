/* Consent Mode v2 defaults. This file is ours, not Google's script.
   It runs before the site and before gtag.js, and it does not load Google. */
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() {
  window.dataLayer.push(arguments);
};
window.gtag("consent", "default", {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
});
window.__tcbConsentDefault = true;
