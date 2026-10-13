import { Container } from "@/components/ui/Container";

// Native <details> accordion, plus FAQPage structured data so the answers
// stay eligible for search rich results like they were on the old site.
export function SolutionFaqs({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="w-full bg-white py-20 md:py-24">
      <Container>
        <h2 className="header-3 mb-10 text-black max-md:text-[24px]! max-md:leading-8!">
          frequently asked questions
        </h2>
        <div className="border-t border-light-grey">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-light-grey">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-bold text-black [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden
                  className="mt-0.5 text-2xl leading-none text-cerulean transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[900px] pb-6 text-base leading-7 text-black/80">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
      <script
        type="application/ld+json"
        // Static content from solutions.ts; "<" is escaped so no string can close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
