const COMPANY_ALIASES: Record<string, string> = {
  deloitte: "Deloitte",
  "deloitte manchester": "Deloitte",
  "deloitte uk": "Deloitte",
  pwc: "PwC",
  "pwc birmingham": "PwC",
  "pricewaterhousecoopers": "PwC",
  "price waterhouse coopers": "PwC",
  "bbc media city": "BBC Media City",
  "bbc mediacity": "BBC Media City",
  "natwest group": "NatWest Group",
  natwest: "NatWest Group",
  "rolls royce": "Rolls-Royce",
  "rolls-royce": "Rolls-Royce",
  tesco: "Tesco",
  "sainsbury's": "Sainsbury's",
  sainsburys: "Sainsbury's",
  asda: "Asda",
  morrisons: "Morrisons",
  aldi: "Aldi",
  lidl: "Lidl",
  "co-op": "Co-op",
  coop: "Co-op",
};

function normaliseToken(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(value: string): string {
  const upperCaseTokens = new Set(["uk", "usa", "bbc", "pwc"]);

  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      if (upperCaseTokens.has(word)) {
        return word.toUpperCase();
      }
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");
}

export function normalizeCompanyName(rawValue: string | null | undefined): string {
  const value = typeof rawValue === "string" ? rawValue : "";
  const token = normaliseToken(value);

  if (!token || token === "no" || token === "none" || token === "other" || token === "unknown") {
    return "Unknown/Other";
  }

  return COMPANY_ALIASES[token] ?? titleCase(token);
}

export function isUnknownCompanyName(value: string | null | undefined): boolean {
  return normalizeCompanyName(value) === "Unknown/Other";
}
