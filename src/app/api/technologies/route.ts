import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      include: {
        category: true
      }
    });

    return NextResponse.json(technologies);
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return NextResponse.json(
      { error: 'Error fetching technologies' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const technology = await prisma.technology.create({
      data: {
        name: json.name,
        category: {
          connect: {
            id: json.categoryId
          }
        }
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(technology);
  } catch (error) {
    console.error('Error creating technology:', error);
    return NextResponse.json(
      { error: 'Error creating technology' },
      { status: 500 }
    );
  }
}
