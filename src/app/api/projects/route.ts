import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchProjectsWithRetry(retries = 3) {
  for (let i = 0; i < retries; i++) {
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
          year: 'desc'
        }
      });
      
      return projects;
    } catch (error) {
      console.log(`Attempt ${i + 1} failed, retrying in 3 seconds...`);
      if (i === retries - 1) throw error;
      await wait(3000);
    }
  }
}

async function createProjectWithRetry(retries = 3, request: Request) {
  for (let i = 0; i < retries; i++) {
    try {
      const json = await request.json();
      const now = new Date();
      
      const project = await prisma.project.create({
        data: {
          title: json.title,
          description: json.description,
          year: parseInt(json.year),
          image: json.image,
          demoUrl: json.demoUrl,
          githubUrl: json.githubUrl,
          featured: json.featured,
          order: json.order,
          createdAt: now,
          updatedAt: now
        },
        include: {
          technologies: {
            include: {
              category: true
            }
          }
        }
      });

      return project;
    } catch (error) {
      console.log(`Attempt ${i + 1} failed, retrying in 3 seconds...`);
      if (i === retries - 1) throw error;
      await wait(3000);
    }
  }
}

export async function GET() {
  try {
    const projects = await fetchProjectsWithRetry();
    
    if (!projects) {
      return NextResponse.json(
        { error: 'No projects found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const project = await createProjectWithRetry(3, request);
    
    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
