import { NextRequest, NextResponse } from "next/server";
import { searchSite, getSiteBySlug } from "@sirnak/shared";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const types = searchParams.get("types")?.split(",") as Array<"service" | "blog" | "district" | "page"> | undefined;

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const site = await getSiteBySlug("tesisat");
  if (!site) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  const results = await searchSite(site.id, query, { types, limit: 20 });
  return NextResponse.json({ results });
}
