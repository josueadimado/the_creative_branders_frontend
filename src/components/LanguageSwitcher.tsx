import { useEffect, useId, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  localeFromPath,
  rememberLocale,
  switchLocalePath,
  type Locale,
} from "../i18n/locale";
import { useDisplayLocation } from "./DisplayLocation";

const OPTIONS: { code: Locale; labelKey: "langEnName" | "langFrName" }[] = [
  { code: "en", labelKey: "langEnName" },
  { code: "fr", labelKey: "langFrName" },
];

export default function LanguageSwitcher({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const { t } = useTranslation("common");
  const live = useLocation();
  const shown = useDisplayLocation();
  const navigate = useNavigate();
  const active = localeFromPath(shown.pathname);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function go(next: Locale) {
    setOpen(false);
    if (next === active) return;
    rememberLocale(next);
    navigate(switchLocalePath(live.pathname, live.search, live.hash, next));
  }

  const trigger =
    tone === "dark"
      ? "text-white/70 hover:text-white"
      : "text-slate hover:text-navy";
  const menu =
    tone === "dark"
      ? "border-white/15 bg-navy text-white shadow-lg"
      : "border-mist bg-white text-navy shadow-lg";
  const optionIdle = tone === "dark" ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-slate hover:bg-paper hover:text-navy";
  const optionOn = tone === "dark" ? "bg-white/10 text-white" : "bg-paper text-navy";

  return (
    <div className="relative" ref={root}>
      <button
        type="button"
        className={`inline-flex size-9 items-center justify-center rounded-md transition-colors duration-200 ${trigger}`}
        aria-label={t("language")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        title={t("language")}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe className="size-[1.15rem]" strokeWidth={1.5} aria-hidden="true" />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={t("language")}
          className={`absolute right-0 top-full z-50 mt-2 min-w-[9.5rem] overflow-hidden rounded-md border py-1 ${menu}`}
        >
          {OPTIONS.map((option) => {
            const selected = active === option.code;
            return (
              <button
                key={option.code}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => go(option.code)}
                className={`flex w-full items-center justify-between gap-4 px-3 py-2 text-left text-sm font-medium transition-colors ${
                  selected ? optionOn : optionIdle
                }`}
              >
                <span>{t(option.labelKey)}</span>
                <span className="text-[11px] font-semibold tracking-[0.08em] opacity-60">
                  {option.code.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
