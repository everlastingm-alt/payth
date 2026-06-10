import { Lightbulb, Target, Search } from "lucide-react";
import type { PlaybookArticle } from "@/lib/content/schema";
import PlaybookHero from "./PlaybookHero";
import PlaybookSection from "./PlaybookSection";
import PlaybookProviderQuestions from "./PlaybookProviderQuestions";
import PlaybookActionChecklist from "./PlaybookActionChecklist";
import PlaybookCommonMistakes from "./PlaybookCommonMistakes";
import FaqAccordion from "./FaqAccordion";
import AssessmentCta from "./AssessmentCta";
import RelatedPlaybooks from "./RelatedPlaybooks";
import PlaybookJsonLd from "./PlaybookJsonLd";

const sectionIcons = [
  <Lightbulb key="means" size={22} className="text-payth-blue" strokeWidth={2} />,
  <Target key="matters" size={22} className="text-payth-blue" strokeWidth={2} />,
  <Search key="check" size={22} className="text-payth-blue" strokeWidth={2} />,
];

export default function PlaybookContent({
  article,
  relatedPlaybooks = [],
}: {
  article: PlaybookArticle;
  relatedPlaybooks?: PlaybookArticle[];
}) {
  const [whatItMeans, whyItMatters, howToCheck] = article.sections;

  return (
    <>
      <PlaybookJsonLd article={article} />

      <div className="space-y-8">
        <PlaybookHero article={article} />

        {whatItMeans && (
          <PlaybookSection
            heading={whatItMeans.heading}
            content={whatItMeans.content}
            icon={sectionIcons[0]}
          />
        )}

        {whyItMatters && (
          <PlaybookSection
            heading={whyItMatters.heading}
            content={whyItMatters.content}
            icon={sectionIcons[1]}
          />
        )}

        {howToCheck && (
          <PlaybookSection
            heading={howToCheck.heading}
            content={howToCheck.content}
            icon={sectionIcons[2]}
          />
        )}

        <PlaybookProviderQuestions questions={article.providerQuestions} />

        <PlaybookCommonMistakes mistakes={article.commonMistakes} />

        <PlaybookActionChecklist items={article.actionChecklist} />

        <FaqAccordion faq={article.faq} />

        <AssessmentCta
          recommendedAssessments={article.recommendedAssessments}
        />

        <RelatedPlaybooks playbooks={relatedPlaybooks} />
      </div>
    </>
  );
}
