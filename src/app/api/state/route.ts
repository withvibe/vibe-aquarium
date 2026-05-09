import { NextResponse } from "next/server";
import { listFish } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ fish: listFish() });
}
