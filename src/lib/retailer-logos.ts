export type RetailerSlug =
  | "tesco"
  | "sainsburys"
  | "asda"
  | "morrisons"
  | "aldi"
  | "lidl";

export interface RetailerLogoManifestEntry {
  src: string;
  alt: string;
  sourceRepo: string;
  sourceUrl: string;
}

export const retailerLogoManifest: Record<RetailerSlug, RetailerLogoManifestEntry> = {
  tesco: {
    src: "/logos/retailers/tesco.svg",
    alt: "Tesco logo",
    sourceRepo: "detain/svg-logos",
    sourceUrl: "https://raw.githubusercontent.com/detain/svg-logos/master/svg/t/tesco.svg",
  },
  sainsburys: {
    src: "/logos/retailers/sainsburys.svg",
    alt: "Sainsbury's logo",
    sourceRepo: "detain/svg-logos",
    sourceUrl:
      "https://raw.githubusercontent.com/detain/svg-logos/master/svg/s/sainsburys-logo.svg",
  },
  asda: {
    src: "/logos/retailers/asda.svg",
    alt: "Asda logo",
    sourceRepo: "detain/svg-logos",
    sourceUrl: "https://raw.githubusercontent.com/detain/svg-logos/master/svg/a/asda.svg",
  },
  morrisons: {
    src: "/logos/retailers/morrisons.svg",
    alt: "Morrisons logo",
    sourceRepo: "detain/svg-logos",
    sourceUrl: "https://raw.githubusercontent.com/detain/svg-logos/master/svg/m/morrisons.svg",
  },
  aldi: {
    src: "/logos/retailers/aldi.svg",
    alt: "Aldi logo",
    sourceRepo: "detain/svg-logos",
    sourceUrl: "https://raw.githubusercontent.com/detain/svg-logos/master/svg/a/aldi.svg",
  },
  lidl: {
    src: "/logos/retailers/lidl.svg",
    alt: "Lidl logo",
    sourceRepo: "detain/svg-logos",
    sourceUrl: "https://raw.githubusercontent.com/detain/svg-logos/master/svg/l/lidl.svg",
  },
};
