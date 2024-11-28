import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const frontend = await prisma.category.create({
    data: {
      name: 'Frontend',
    },
  });

  const backend = await prisma.category.create({
    data: {
      name: 'Backend',
    },
  });

  const tools = await prisma.category.create({
    data: {
      name: 'Tools & Design',
    },
  });

  // Create technologies
  const react = await prisma.technology.create({
    data: {
      name: 'React',
      categoryId: frontend.id,
    },
  });

  const nextjs = await prisma.technology.create({
    data: {
      name: 'Next.js',
      categoryId: frontend.id,
    },
  });

  const typescript = await prisma.technology.create({
    data: {
      name: 'TypeScript',
      categoryId: frontend.id,
    },
  });

  const nodejs = await prisma.technology.create({
    data: {
      name: 'Node.js',
      categoryId: backend.id,
    },
  });

  const postgresql = await prisma.technology.create({
    data: {
      name: 'PostgreSQL',
      categoryId: backend.id,
    },
  });

  // Create projects
  await prisma.project.create({
    data: {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB. Features include user authentication, product management, and payment integration.',
      year: 2023,
      featured: true,
      order: 1,
      technologies: {
        connect: [
          { id: nextjs.id },
          { id: nodejs.id },
          { id: typescript.id },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates. Includes features like task assignment, due dates, and team collaboration.',
      year: 2023,
      featured: true,
      order: 2,
      technologies: {
        connect: [
          { id: react.id },
          { id: nodejs.id },
          { id: postgresql.id },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
