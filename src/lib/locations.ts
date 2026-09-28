export type OfficeLocation = {
  name: string;
  lines: [string, string];
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  { name: "Florida", lines: ["3802 Corporex Park Dr, Suite 225", "Tampa, FL 33619"] },
  { name: "Ohio", lines: ["2825 Hallie Lane", "Granville, OH 43023"] },
  { name: "California", lines: ["25692 Atlantic Ocean Drive", "Lake Forest, CA 92630"] },
  { name: "Georgia", lines: ["1005 Alderman Dr, Suite 111", "Alpharetta, GA 30005"] },
  { name: "Minnesota", lines: ["8801 Brooklyn Blvd.", "Brooklyn Park, MN 55445"] },
  { name: "Puerto Rico", lines: ["Carretera 174, Suite 3", "Bayamón PR 00959-1910"] },
];
