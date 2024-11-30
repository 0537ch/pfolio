import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing data in correct order (child tables first)
  await prisma.technology.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.category.deleteMany({});

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
      title: 'Online Shop Laravel',
      description: 'E-commerce platform built with Laravel & Filament, featuring product management, shopping cart, and secure payment integration. Includes user authentication, admin dashboard, and order tracking.',
      year: 2024,
      demoUrl: 'https://onlineshop-lrv.vercel.app',
      githubUrl: 'https://github.com/0537ch/onlineshoplrv',
      featured: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });

  const academix = await prisma.project.create({
    data: {
      title: 'Academix',
      description: 'Academic management system built with MERN Stack (MongoDB, Express.js, React, Node.js). Features include student management, course scheduling, grade tracking, and attendance monitoring with real-time updates.',
      year: 2024,
      image: null,
      demoUrl: null,
      githubUrl: 'https://github.com/0537ch/academix',
      featured: true,
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });

  const weatherdb = await prisma.project.create({
    data: {
      title: 'Weather Dashboard',
      description: 'Weather Dashboard with Interactive UI using python, flask, and html. Features include real-time weather updates, user-friendly interface, and responsive design.',
      year: 2024,
      image: 'null',
      demoUrl: 'null',
      githubUrl: 'https://github.com/0537ch/pyweather',
      featured: true,
      order: 3,
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
      demoUrl: 'https://abrarikr.vercel.app',
      featured: true,
      order: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });

  await prisma.project.create({
    data: {
      title: 'PDF to PNG',
      description: 'a simple converter from pdf to png using python and flask',
      githubUrl: 'https://github.com/0537ch/pdftopng',
      year: 2024,
      featured: true,
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
