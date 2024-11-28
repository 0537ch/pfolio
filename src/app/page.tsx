"use client";

import React, { useRef, useState } from 'react';
import { Heading, Text, Flex, Button, Grid, LetterFx, Arrow } from '@/once-ui/components';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import timelineStyles from './timeline.module.css';
import { useScrollProgress } from './hooks/useScrollProgress';

const projects = [
  {
    year: '2023',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB. Features include user authentication, product management, and payment integration.',
    technologies: ['Next.js', 'Node.js', 'MongoDB']
  },
  {
    year: '2022',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates. Includes features like task assignment, due dates, and team collaboration.',
    technologies: ['React', 'Express', 'PostgreSQL']
  },
  {
    year: '2021',
    title: 'AI Image Generator',
    description: 'An AI-powered image generation platform that creates unique artwork based on text descriptions. Integrates with OpenAI\'s DALL-E API.',
    technologies: ['React', 'Node.js', 'OpenAI API']
  }
];

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(timelineRef);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current!.offsetLeft);
    setScrollLeft(timelineRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <Flex
      fillWidth paddingTop="l" paddingX="l"
      direction="column" alignItems="center" flex={1}>
      <Flex
        position="relative"
        as="section" overflow="hidden"
        fillWidth minHeight="0" maxWidth={68}
        direction="column" alignItems="center" flex={1}>
        
        {/* Hero Section */}
        <Flex
          as="main"
          direction="column" justifyContent="center"
          fillWidth fillHeight padding="l" gap="l">
          <Flex
            mobileDirection="column"
            fillWidth gap="24">
            <Flex
              position="relative"
              flex={4} gap="24" marginBottom="104"
              direction="column">
              <Heading
                wrap="balance"
                variant="display-strong-s">
                <span className="font-code">
                  <LetterFx trigger="instant">
                    Hi, I'm Abrar Ikramaputra
                  </LetterFx>
                </span>
              </Heading>
              <Text size="l" color="medium">
                Full Stack Developer & Designer
              </Text>
              <Flex gap="m">
                <Button
                  href="https://github.com/0537ch"
                  prefixIcon="github" 
                  size="m" 
                  variant="secondary"
                />
                <Button
                  href="mailto:abrarikramaputra@gmail.com"
                  prefixIcon="mail" 
                  size="m" 
                  variant="secondary"
                />
                <Button
                  href="https://linkedin.com/in/abrarikramaputra"
                  prefixIcon="linkedin" 
                  size="m" 
                  variant="secondary"
                />
              </Flex>
              <Button
                id="contactMe"
                href="#contact"
                variant="secondary">
                <Flex alignItems="center">
                  Get in touch
                  <Arrow trigger="#contactMe"/>
                </Flex>
              </Button>
            </Flex>
          </Flex>

          {/* Skills Section */}
          <Flex
            id="skills"
            direction="column"
            gap="l"
            paddingY="xl">
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '48px',
              marginTop: '32px'
            }}>
              <div>
                <Heading variant="heading-strong-s">Frontend</Heading>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '16px'
                }}>
                  <Text color="medium" 
                    className={styles.techTag}>React</Text>
                  <Text color="medium" 
                    className={styles.techTag}>Next.js</Text>
                  <Text color="medium" 
                    className={styles.techTag}>TypeScript</Text>
                  <Text color="medium" 
                    className={styles.techTag}>Tailwind CSS</Text>
                  <Text color="medium" 
                    className={styles.techTag}>SCSS</Text>
                  <Text color="medium" 
                    className={styles.techTag}>Redux</Text>
                  <Text color="medium" 
                    className={styles.techTag}>React Query</Text>
                </div>
              </div>
              <div>
                <Heading variant="heading-strong-s">Backend</Heading>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '16px'
                }}>
                  <Text color="medium" 
                    className={styles.techTag}>Node.js</Text>
                  <Text color="medium" 
                    className={styles.techTag}>Express</Text>
                  <Text color="medium" 
                    className={styles.techTag}>NestJS</Text>
                  <Text color="medium" 
                    className={styles.techTag}>MongoDB</Text>
                  <Text color="medium" 
                    className={styles.techTag}>PostgreSQL</Text>
                  <Text color="medium" 
                    className={styles.techTag}>REST API</Text>
                  <Text color="medium" 
                    className={styles.techTag}>GraphQL</Text>
                </div>
              </div>
              <div>
                <Heading variant="heading-strong-s">Tools</Heading>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '16px'
                }}>
                  <Text color="medium" 
                    className={styles.techTag}>Git</Text>
                  <Text color="medium" 
                    className={styles.techTag}>Docker</Text>
                  <Text color="medium" 
                    className={styles.techTag}>AWS</Text>
                  <Text color="medium" 
                    className={styles.techTag}>Figma</Text>
                  <Text color="medium" 
                    className={styles.techTag}>Adobe XD</Text>
                  <Text color="medium" 
                    className={styles.techTag}>UI/UX</Text>
                  <Text color="medium" 
                    className={styles.techTag}>Design Systems</Text>
                </div>
              </div>
            </div>
          </Flex>

          {/* Projects Section */}
          <Flex
            id="projects"
            direction="column"
            gap="l"
            paddingY="xl">
            <Heading variant="heading-strong-m">Featured Projects</Heading>
            <Text color="medium">
              Here are some projects I've worked on
            </Text>
            
            <div 
              className={timelineStyles.timelineContainer} 
              ref={timelineRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}>
              <motion.div 
                className={timelineStyles.timeline}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    className={timelineStyles.projectCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}>
                    <Heading variant="heading-strong-s">{project.title}</Heading>
                    <Text color="medium" style={{ marginTop: '8px' }}>
                      {project.description}
                    </Text>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                      {project.technologies.map((technology, index) => (
                        <Text 
                          color="medium" 
                          className={styles.techTag} 
                          key={index}>
                          {technology}
                        </Text>
                      ))}
                    </div>
                    <div className={timelineStyles.year}>{project.year || '2023'}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className={timelineStyles.progressBar}>
              <motion.div 
                className={timelineStyles.progress} 
                style={{ width: `${scrollProgress}%` }} />
            </div>

            {/* View All Projects Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <Button
                href="/projects"
                variant="secondary"
                size="m">
                View All Projects
              </Button>
            </div>
          </Flex>

          {/* Contact Section */}
          <Flex
            id="contact"
            direction="column"
            gap="l"
            paddingY="xl"
            alignItems="center">
            <Heading variant="heading-strong-m">Let's Connect</Heading>
            <Text color="medium" align="center">
              I'm always open to new opportunities and collaborations
            </Text>
            <Flex gap="m">
              <Button
                href="mailto:abrarikramaputra@gmail.com"
                variant="secondary">
                Email Me
              </Button>
              <Button
                href="https://linkedin.com/in/abrarikramaputra"
                variant="secondary">
                LinkedIn
              </Button>
              <Button
                href="https://github.com/0537ch"
                variant="secondary">
                GitHub
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
