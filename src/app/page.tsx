"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Heading, Text, Flex, Button, Grid, LetterFx, Arrow } from '@/once-ui/components';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import timelineStyles from './timeline.module.css';
import { useScrollProgress } from './hooks/useScrollProgress';

type Project = {
  id: string;
  title: string;
  description: string;
  year: number;
  image: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  technologies: string[];
};

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(timelineRef);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch projects when component mounts
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

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
                  href="https://www.linkedin.com/in/abrar-ikramaputra-b65051221/"
                  target="_blank"
                  variant="secondary"
                  size="m"
                  prefixIcon="linkedin">
                  LinkedIn
                </Button>
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
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}>
              <motion.div 
                className={timelineStyles.timeline}>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.2
                    }}
                    className={timelineStyles.projectCard}>
                    <Text color="medium" style={{ fontSize: '14px', marginBottom: '8px' }}>{project.year}</Text>
                    <Heading variant="heading-strong-m">{project.title}</Heading>
                    <Text color="medium" style={{ marginTop: '8px' }}>
                      {project.description}
                    </Text>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                      {project.technologies?.map((technology, index) => (
                        <Text 
                          color="medium" 
                          className={styles.techTag} 
                          key={index}>
                          {technology}
                        </Text>
                      ))}
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      marginTop: '24px',
                      justifyContent: 'flex-end' 
                    }}>
                      {project.demoUrl && (
                        <Button
                          href={project.demoUrl}
                          target="_blank"
                          variant="secondary"
                          size="s">
                          Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          href={project.githubUrl}
                          target="_blank"
                          variant="secondary"
                          size="s"
                          prefixIcon="github">
                          Code
                        </Button>
                      )}
                    </div>
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
                href="https://www.linkedin.com/in/abrar-ikramaputra-b65051221/"
                target="_blank"
                variant="secondary"
                size="m"
                prefixIcon="linkedin">
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
