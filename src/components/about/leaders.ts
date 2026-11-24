export type Leader = {
  name: string;
  title: string;
  image: string;
  // Paragraphs are separated by a blank line ("\n\n").
  bio: string;
  // Omit when there's no profile; the modal then leaves the link out.
  linkedIn?: string;
};

export const CEO: Leader = {
  name: "Jim Fulk",
  title: "CEO, Channel Partners",
  image: "/images/about/jim-modal.webp",
  bio: "Jim leads Channel Partners with 20 years in retail merchandising and executive leadership. Before joining, he served as CEO of White Hawk, Executive Vice President of RMSe, and Executive Vice President of the Install division at BDS. He has also served on the Board of Directors of WARES. Jim studied business law while serving in the United States Air Force, a foundation that still shapes how he runs the business.",
  linkedIn: "https://www.linkedin.com/in/jimfulk/",
};

export const LEADERS: Leader[] = [
  {
    name: "Khalid Khakish",
    title: "CFO",
    image: "/images/about/leader-khalid.png",
    bio: "Khalid brings 20 years in financial operations, strategy, and governance. As CFO he partners with the C-suite to operationalize strategy, holding governance, accountability, and alignment in place across the organization. His record covers financial modeling, budgeting, forecasting, and acquisitions. His approach is data-first: decisions get made against numbers, not instinct. That discipline is what keeps growth from outrunning the structure supporting it.",
    linkedIn: "https://www.linkedin.com/in/khalidkakish/",
  },
  {
    name: "Dustin Pawlak",
    title: "EVP Shared Services",
    image: "/images/about/leader-dustin.png",
    bio: "Dustin leads Shared Services, with oversight spanning IT, Analytics, Training, HR, Recruiting, Marketing, and the Support Center. His background covers human resources, compliance, training, investigations, and organizational development. He served 34 years with the U.S. Air Force, most recently as Chief of Case Management for the Secretary of the Air Force, Office of the Inspector General. He holds a Doctorate in Organizational Leadership and dual master's degrees in Management and Human Resources Development. He builds teams that hold their standard without being watched.",
    linkedIn: "https://www.linkedin.com/in/dustin-pawlak-71825723/",
  },
  {
    name: "Jay Chandran",
    title: "EVP IT & Analytics",
    image: "/images/about/leader-jay.webp",
    bio: "Jay leads Information Technology and Analytics as Head of Technology and AI Innovation. He has driven large-scale digital transformation across retail, media, travel, and private equity-backed companies, including senior roles at QVC, HSN, VGL Group, and Lazydays RV, where he modernized e-commerce, mobile, and cloud platforms across 24 locations. He holds dual master's degrees in AI and Business Analytics and in Cybersecurity Intelligence, is a certified PMP, and completed AI strategy executive education at MIT Sloan.",
    linkedIn: "https://www.linkedin.com/in/jay-chandran-tech-exec/",
  },
  {
    name: "Jack Murphy",
    title: "EVP Strategic Growth",
    image: "/images/about/leader-jack.png",
    bio: "Jack cultivates strategic business opportunities and develops new business segments for Channel Partners. He brings 25 years of retail industry experience leading teams through complex, multi-market programs, and holds a BA in Marketing from Texas A&M University. He works the way he expects partners to work: direct, early, and without surprises. The relationships he builds tend to outlast the programs that started them.",
    linkedIn: "https://www.linkedin.com/in/jack-murphy-9080613/",
  },
  {
    name: "Chris Frederick",
    title: "Group EVP",
    image: "/images/about/leader-chris.png",
    // TODO(content): the supplied quote was cut off after "at the speed our clients";
    // "need" is a stand-in until the full sentence is confirmed. LinkedIn URL to come.
    bio: "Chris leads the Retail Execution team (REX) at Channel Partners, overseeing Field Operations, Client Services, Commercial Construction, Professional Services, and Warehousing, Fulfillment & Logistics. He brings over 25 years of experience in retail, having held multiple C-suite and senior executive leadership roles overseeing large-scale operations, analytics, and business transformation. He holds a BS in Supply Chain Operations from Auburn University.\n\nHis leadership philosophy: “Retail never stops evolving, and neither should we. I believe in empowering great people, challenging the status quo, and turning ideas into action at the speed our clients need.”",
  },
  {
    name: "Mai Zazueta",
    title: "EVP AS&T",
    image: "/images/about/leader-mai.png",
    bio: "Mai leads Client Service at Channel Partners, owning the distance between what a program promises and what a client experiences. She holds a BA in Business Administration from the University of Hawaii and builds teams that raise problems early rather than manage around them. Her operating principle is one she repeats often: don't be afraid to fail, be afraid not to try.",
    linkedIn: "https://www.linkedin.com/in/mai-zazueta-b7580b3/",
  },
];
