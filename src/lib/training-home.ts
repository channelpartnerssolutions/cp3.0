// Copy for the Training & Enablement home page (/training-enablement),
// carried over from the live channelpartners.com/enterprise-training page.
// Headlines are uppercased by the type styles, so they're written in
// sentence case with no terminal punctuation.

import { Award, BookOpen, ClipboardCheck, Globe, MonitorPlay, Presentation, Route, Users, Wrench } from "lucide-react";

const IMG = "/images/training";

export const trainingHero = {
  title: "Enterprise Technical Training, Delivered Globally",
  image: { src: `${IMG}/hero.png`, alt: "Snapdragon technical training session in a corporate boardroom" },
};

export const trainingIntro = {
  // TODO(content): headline written from the live page's intro; confirm.
  heading: "Curriculum built with your product organization",
  accent: "One standard in every market",
  body: "We recruit, certify, and deploy technical instructors who translate complex technology into practical, hands-on learning for enterprise teams, channel partners, and customers. Curriculum built with your product organization. Delivery held to one standard across every market you operate in.",
  stats: [
    { value: "53", label: "Countries reached" },
    { value: "18", label: "Technology partners enabled" },
    { value: "600+", label: "Certified trainers deployed" },
    { value: "100%", label: "Instructors certified" },
  ],
};

// The programs are full case studies (lib/case-studies.ts); the home page
// previews them and links to each one.
export const trainingPrograms = {
  eyebrow: "Proof of expertise",
  heading: "Programs already running at global scale",
  slugs: [
    "microsoft-global-training-readiness",
    "meta-global-certification-program",
    "qualcomm-snapdragon-partner-enablement",
  ],
};

export const trainingAudiences = {
  heading: "Supporting organizations across multiple markets worldwide",
  // The clients named in the programs above.
  logos: [
    { src: "/images/homepage/brands/microsoft.svg", name: "Microsoft", w: 140, h: 30 },
    { src: "/images/homepage/brands/meta-wordmark.svg", name: "Meta", w: 97, h: 30 },
    { src: "/images/homepage/brands/qualcomm.svg", name: "Qualcomm", w: 150, h: 28 },
  ],
  items: [
    {
      title: "Product and engineering organizations",
      body: "Launching platforms that require practitioner-level understanding before adoption follows. This is where most enterprise programs begin, and where curriculum, certification, and instructor depth are set.",
      image: { src: `${IMG}/who-we-work-with-01.jpg`, alt: "Product and engineering organizations" },
    },
    {
      title: "Partner and channel organizations",
      body: "Enabling OEMs, resellers, systems integrators, and distribution partners on technical products.",
      image: { src: `${IMG}/who-we-work-with-02.jpg`, alt: "Partner and channel organizations" },
    },
    {
      title: "Customer success and professional services",
      body: "Building enablement paths that take enterprise customers from first login to advanced use.",
      image: { src: `${IMG}/who-we-work-with-03.jpg`, alt: "Customer success and professional services" },
    },
    {
      title: "Learning and enablement leaders",
      body: "Global delivery capacity, instructor quality they can verify, and proficiency data they can report upward.",
      image: { src: `${IMG}/who-we-work-with-04.jpg`, alt: "Learning and enablement leaders" },
    },
  ],
};

// `solution` is the Training & Enablement solution (pillars.ts) each
// capability links to.
export const trainingCapabilities = {
  eyebrow: "Technical training capabilities",
  heading: "Curriculum, instructors, certification,",
  accent: "and the bench to deliver",
  items: [
    {
      title: "Build the", accent: "Program",
      body: "Curriculum, certification frameworks, and assessment designed against your product, not adapted from a template.",
      solution: "curriculum-program-design",
      services: [
        { icon: BookOpen, title: "Technical curriculum development", body: "Built with your product and engineering teams, structured around real workflows, and versioned against your release cycle." },
        { icon: ClipboardCheck, title: "Certification programs", body: "Multi-level certification frameworks with defined competencies, written and practical assessment, and recertification tied to product change." },
        { icon: Award, title: "Skills assessments", body: "Competency measured through labs, practical evaluations, and structured assessment rather than attendance records." },
      ],
    },
    {
      title: "Deliver the", accent: "Training",
      body: "Certified instructors in the room, on the call, and in live product environments — one standard across every format.",
      solution: "training-delivery",
      services: [
        { icon: Presentation, title: "Instructor-led training", body: "Classroom and on-site delivery by instructors certified on your platform, with practitioner-level depth on the material." },
        { icon: MonitorPlay, title: "Virtual instructor-led training", body: "Live remote delivery for distributed teams and partners, with the same curriculum, assessment, and certification standard as in-person sessions." },
        { icon: Wrench, title: "Hands-on workshops", body: "Practitioners working in live product environments, applying the material as they learn it." },
      ],
    },
    {
      title: "Scale the", accent: "Standard",
      body: "Reach extended through your own experts and our global bench, without diluting the quality of what gets taught.",
      solution: "audience-enablement-program",
      services: [
        { icon: Route, title: "Product enablement programs", body: "Structured paths from first login through advanced use cases, mapped to how your customers and partners actually deploy the product." },
        { icon: Users, title: "Train-the-trainer programs", body: "Your internal experts assessed, certified, and equipped to teach at your standard, extending reach without diluting quality." },
        { icon: Globe, title: "Global training deployment and delivery", body: "One curriculum, one standard, delivered across regions and languages by our own team." },
      ],
    },
  ],
};

export const trainingGovernance = {
  eyebrow: "Instructor quality and governance",
  heading: "How we protect training quality at global scale",
  body: "Instructor quality is the variable that determines whether a technical training program works. We govern it as a formal process with defined gates.",
  solution: "instructor-sourcing-certification",
  steps: [
    { title: "Recruitment", body: "Trainers are sourced against technical competencies defined for the specific program: the platform, the stack, or the discipline the curriculum requires. Sourcing profiles are built with your team before recruiting opens." },
    { title: "Assessment", body: "Candidates move through structured technical interviews and teach-back evaluations. They deliver the material to us under assessment conditions before they are considered for the program." },
    { title: "Certification", body: "Every instructor completes immersion in your platform and curriculum, then passes written and practical certification. Certification is a prerequisite for deployment, applied without exception." },
    { title: "Ongoing coaching", body: "Instructors are observed during live delivery and receive structured feedback within the same week. Coaching is continuous across the life of the program." },
    { title: "Recertification", body: "Certification is tied to your release cycle. When curriculum changes, instructors recertify against the updated material before returning to delivery." },
    { title: "Quality assurance", body: "Delivery is evaluated against defined criteria, learner assessment data is reviewed by program, and instructors who fall below standard are remediated or removed from the bench." },
  ],
};

export const trainingFaqs = {
  heading: "Questions we are asked before scoping",
  items: [
    { question: "What is enterprise technical training?", answer: "Enterprise technical training builds practitioner-level capability in complex technology products across internal teams, channel partners, and enterprise customers. It typically combines curriculum development, instructor-led and virtual delivery, hands-on labs, and certification, structured around the product rather than around general skills content." },
    { question: "Do you develop the curriculum or deliver ours?", answer: "Both. We develop technical curriculum with your product and engineering teams, and we prepare certified instructors to deliver curriculum you already own. Most engagements combine the two: your source material, restructured for practitioner learning, with labs, assessments, and certification criteria built against it." },
    { question: "How do you recruit and certify technical trainers?", answer: "Trainers are sourced against technical competencies defined for the specific program, assessed through structured technical interviews and teach-back evaluations, immersed in your platform and curriculum, then certified through written and practical assessment. Certification is required before deployment and is renewed when curriculum changes." },
    { question: "Can you deliver instructor-led training globally?", answer: "Yes. We have supported readiness operations across 53 countries on a single program and delivered a train-the-trainer program across 24 countries with full Master Trainer certification. Delivery is handled by our own certified instructor network, coordinated centrally, in the languages your teams and partners work in." },
    { question: "Do you offer virtual instructor-led training?", answer: "Yes. Virtual instructor-led sessions run live with the same curriculum, assessment, and certification standards as classroom delivery. Most global programs combine formats, using virtual delivery for distributed audiences and in-person workshops where hands-on lab work is essential to competence." },
    { question: "What does a certification program include?", answer: "A defined competency model, curriculum mapped to those competencies, written and practical assessment, a certification decision based on demonstrated ability, and a recertification schedule tied to your product release cycle. Multi-level frameworks are common where audiences range from foundational to advanced practitioner." },
    { question: "How do you measure whether the training worked?", answer: "Metrics are agreed before design begins. We report certification rate, time to competence, proficiency and knowledge gain from pre and post assessment, adoption across the enabled population, and program health data. Reporting runs during delivery so your team can act on it while the program is live." },
    { question: "Can you train our channel partners as well as our own teams?", answer: "Yes. Partner training is a core part of the practice. We have enabled 18 strategic partners on a single global program and built enablement across OEM, channel, and distribution organizations. Partner programs are typically structured with train-the-trainer capacity so partner organizations can sustain the standard internally." },
    { question: "How quickly can a program be deployed?", answer: "Timelines depend on curriculum scope and instructor volume. We have recruited, certified, and deployed more than 600 technical trainers in under twelve weeks. Curriculum development timelines are set by product complexity and the availability of your subject matter experts, and are scoped at the start of the engagement." },
    { question: "What do you need from us to scope an engagement?", answer: "The product, the audience, and the outcome you need. Existing curriculum, launch dates, and target headcount help. We return a curriculum approach, the instructor profile and bench size required, a delivery plan by market and format, and a measurement plan tied to your metrics." },
  ],
};

export const trainingCta = {
  heading: "Let’s build your global readiness program",
  ctaLabel: "Start a Conversation",
};
