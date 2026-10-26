/* Turns on the Google tag that the build placed in the page.
   Consent is already denied. Accept is what later allows analytics cookies. */
var tag = document.querySelector("script[data-tcb-gtag]");
var match = tag && tag.src.match(/[?&]id=(G-[A-Z0-9]+)/);
var measurementId = match && match[1];

if (measurementId && window.gtag) {
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true, send_page_view: false });
}
