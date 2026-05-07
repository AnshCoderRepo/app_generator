import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('q') || '';
  
  const colleges = await prisma.college.findMany({
    where: {
      name: { contains: search, mode: 'insensitive' }
    },
    include: {
      courses: true,
      reviews: true
    }
  });
  
  return NextResponse.json(colleges);
}
