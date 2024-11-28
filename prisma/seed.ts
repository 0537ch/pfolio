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
  const onlineShop = await prisma.project.create({
    data: {
      title: 'Online Shop LRV',
      description: 'E-commerce platform built with Laravel, featuring product management, shopping cart, and secure payment integration. Includes user authentication, admin dashboard, and order tracking.',
      year: 2023,
      image: 'https://raw.githubusercontent.com/0537ch/onlineshoplrv/main/screenshot.png',
      demoUrl: 'https://onlineshop-lrv.vercel.app',
      githubUrl: 'https://github.com/0537ch/onlineshoplrv',
      featured: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });

  const portfolio = await prisma.project.create({
    data: {
      title: 'Personal Portfolio',
      description: 'Modern portfolio website built with Next.js, featuring a beautiful UI with Framer Motion animations, project showcase, and contact form. Includes server-side rendering and PostgreSQL database.',
      year: 2024,
      image: null,
      demoUrl: 'https://pfolio-0537ch.vercel.app',
      githubUrl: 'https://github.com/0537ch/pfolio',
      featured: true,
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });

  await prisma.project.create({
    data: {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB. Features include user authentication, product management, and payment integration.',
      year: 2023,
      featured: true,
      order: 3,
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
      order: 4,
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
