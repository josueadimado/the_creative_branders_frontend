import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { LocaleLink } from "../components/LocaleLink";
import Seo from "../components/Seo";

export default function NotFound() {
  const { pathname } = useLocation();
  const { t } = useTranslation("legal");

  return (
    <section className="flex min-h-[70svh] items-center bg-navy py-32 sm:py-44">
      <Seo title={t("notFoundTitle")} description={t("notFoundSeo")} path={pathname} index={false} />
      <div className="mx-auto max-w-6xl px-6">
        <p className="type-kicker text-signal">{t("notFoundKicker")}</p>
        <h1 className="type-h1 mt-5 text-white">{t("notFoundHeading")}</h1>
        <p className="type-lede mt-8 max-w-xl text-white/70">{t("notFoundBody")}</p>
        <div className="mt-14">
          <LocaleLink to="/" className="btn btn-primary">
            {t("notFoundHome")}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
