import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        technologies: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Error fetching projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const project = await prisma.project.create({
      data: {
        title: json.title,
        description: json.description,
        year: json.year,
        image: json.image,
        demoUrl: json.demoUrl,
        githubUrl: json.githubUrl,
        featured: json.featured,
        order: json.order,
        technologies: {
          connect: json.technologies.map((id: string) => ({ id }))
        }
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Error creating project' },
      { status: 500 }
    );
  }
}
