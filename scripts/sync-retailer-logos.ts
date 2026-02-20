import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { retailerLogoManifest, type RetailerSlug } from "../src/lib/retailer-logos";

type LogoSource = {
  primary: string;
  fallback?: string;
};

const SIMPLE_ICONS_FALLBACK: Partial<Record<RetailerSlug, string>> = {
  tesco: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tesco.svg",
  asda: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/asda.svg",
  morrisons:
    "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/morrisons.svg",
  lidl: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/lidl.svg",
};

const FORBIDDEN_SVG_PATTERNS = [
  /<script[\s>]/i,
  /<foreignObject[\s>]/i,
  /\sonload=/i,
  /javascript:/i,
];

function cleanSvg(svg: string): string {
  const withoutXmlHeader = svg
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!doctype[\s\S]*?>/gi, "")
    .trim();

  for (const pattern of FORBIDDEN_SVG_PATTERNS) {
    if (pattern.test(withoutXmlHeader)) {
      throw new Error(`Blocked unsafe SVG content by pattern: ${pattern}`);
    }
  }

  if (!/<svg[\s>]/i.test(withoutXmlHeader)) {
    throw new Error("Invalid SVG payload: missing <svg> root element.");
  }

  return withoutXmlHeader;
}

function getViewBox(svg: string): string {
  const match = svg.match(/viewBox="([^"]+)"/i);
  return match?.[1] ?? "missing";
}

async function fetchSvg(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed download ${url} (${response.status}).`);
  }
  return response.text();
}

async function downloadWithFallback(source: LogoSource): Promise<{ svg: string; url: string }> {
  try {
    const svg = await fetchSvg(source.primary);
    return { svg, url: source.primary };
  } catch (primaryError) {
    if (!source.fallback) {
      throw primaryError;
    }

    const svg = await fetchSvg(source.fallback);
    return { svg, url: source.fallback };
  }
}

async function main() {
  const outputDir = path.join(process.cwd(), "public", "logos", "retailers");
  await mkdir(outputDir, { recursive: true });

  console.log(`Syncing retailer logos to ${outputDir}`);

  for (const [slug, manifest] of Object.entries(retailerLogoManifest) as [
    RetailerSlug,
    (typeof retailerLogoManifest)[RetailerSlug],
  ][]) {
    const source: LogoSource = {
      primary: manifest.sourceUrl,
      fallback: SIMPLE_ICONS_FALLBACK[slug],
    };

    const { svg, url } = await downloadWithFallback(source);
    const cleanedSvg = cleanSvg(svg);
    const outputPath = path.join(outputDir, `${slug}.svg`);
    await writeFile(outputPath, cleanedSvg, "utf8");

    console.log(
      `${slug}: saved (${Math.round(Buffer.byteLength(cleanedSvg, "utf8") / 1024)}KB, viewBox=${getViewBox(cleanedSvg)}, source=${url})`
    );
  }

  console.log("Retailer logo sync complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
