import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getCollegeById } from "@/lib/data";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const savedColleges = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: { college: true },
  });

  return NextResponse.json(savedColleges);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collegeId } = await req.json();

  if (!collegeId) {
    return NextResponse.json({ error: "Missing collegeId" }, { status: 400 });
  }

  try {
    // Ensure college exists in DB (sync from CSV if needed)
    let college = await prisma.college.findUnique({
      where: { id: collegeId.toString() },
    });

    if (!college) {
      const csvData = await getCollegeById(collegeId.toString());
      if (!csvData) {
        return NextResponse.json({ error: "College not found" }, { status: 404 });
      }

      college = await prisma.college.create({
        data: {
          id: csvData.id,
          name: csvData.name,
          location: csvData.location,
          description: csvData.description,
          tuition: csvData.tuition,
          rating: csvData.rating,
          type: csvData.type,
          image: csvData.imageUrl,
        },
      });
    }

    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId: college.id,
        },
      },
    });

    if (existing) {
      await prisma.savedCollege.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ saved: false });
    } else {
      await prisma.savedCollege.create({
        data: {
          userId: session.user.id,
          collegeId: college.id,
        },
      });
      return NextResponse.json({ saved: true });
    }
  } catch (error) {
    console.error("Save college error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
