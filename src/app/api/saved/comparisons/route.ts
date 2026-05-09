import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const savedComparisons = await prisma.savedComparison.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(savedComparisons);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, collegeIds } = await req.json();

  if (!name || !collegeIds || !Array.isArray(collegeIds)) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const savedComparison = await prisma.savedComparison.create({
      data: {
        name,
        userId: session.user.id,
        collegeIds,
      },
    });

    return NextResponse.json(savedComparison);
  } catch (error) {
    console.error("Save comparison error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
