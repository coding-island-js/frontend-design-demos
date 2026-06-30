import type { CmsSource } from "./types";
import { localSource } from "./local";
import { contentfulSource } from "./contentful";

/**
 * The single switch that selects the content source.
 *
 * Default is the open-source Git CMS. Set CMS_SOURCE=contentful (plus the
 * Contentful env vars) to flip the whole site over to Contentful, every page
 * keeps working because they only ever talk to the CmsSource interface.
 */
export const cms: CmsSource =
  process.env.CMS_SOURCE === "contentful" ? contentfulSource : localSource;

export type { Article, ArticleSummary, CmsSource } from "./types";
