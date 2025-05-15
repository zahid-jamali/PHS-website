import { Helmet } from "react-helmet";
import SaltMoodMatcher from "@/components/salt-matcher/SaltMoodMatcher";
import { useTranslation } from "react-i18next";

export default function FlavorMatcherPage() {
  const { t } = useTranslation(["translation"]);
  
  return (
    <>
      <Helmet>
        <title>{t("flavor_matcher.page_title")} | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content={t("flavor_matcher.meta_description")} 
        />
        <meta property="og:title" content={`${t("flavor_matcher.page_title")} | Dr. Abdul PHS`} />
        <meta property="og:description" content={t("flavor_matcher.meta_description")} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="bg-gradient-to-b from-background to-muted py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {t("flavor_matcher.header")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("flavor_matcher.subheader")}
            </p>
          </div>
          
          <SaltMoodMatcher />
        </div>
      </div>
    </>
  );
}