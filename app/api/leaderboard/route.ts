import { playerData } from "@/lib/types";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import leaderboard from "@/app/models/leaderboard";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name, score, time } = await req.json();

    const entry = new leaderboard({
      name,
      score,
      time
    });
    await entry.save();

    return Response.json(entry);
  } catch (err) {
    console.error("POST leaderboard error:", err);
    return new Response("Failed to save entry", { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const entries: playerData[] = await leaderboard
      .find()
      .sort({ score: -1 })
      .limit(10);

    return Response.json(entries);
  } catch (err) {
    console.error("GET leaderboard error:", err);
    return new Response("Failed to fetch leaderboard", { status: 500 });
  }
}
