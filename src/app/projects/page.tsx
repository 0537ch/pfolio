"use client";

import React, { useState, useEffect } from 'react';
import { Heading, Text, Button, Flex } from '@/once-ui/components';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

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
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch projects when component mounts
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        // Sort projects by year in descending order
        const sortedProjects = data.sort((a: Project, b: Project) => b.year - a.year);
        setProjects(sortedProjects);
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <Flex
        direction="column"
        gap="xl"
        paddingY="xl"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          padding: '0 24px'
        }}>

        {/* Header */}
        <Flex alignItems="center" gap="m">
          <Button
            href="/"
            variant="secondary"
            size="m"
            prefixIcon="arrow-left">
            Return
          </Button>
          <Heading variant="heading-strong-l">All Projects</Heading>
        </Flex>

        {/* Projects Timeline */}
        <div style={{
          position: 'relative',
          width: '100%',
          padding: '40px 0'
        }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }} />

          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.2
              }}
              style={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                paddingRight: index % 2 === 0 ? '50%' : '0',
                paddingLeft: index % 2 === 0 ? '0' : '50%',
                position: 'relative',
                marginBottom: '60px'
              }}>
              <div style={{
                position: 'relative',
                width: '90%',
                padding: '24px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                marginRight: index % 2 === 0 ? '30px' : '0',
                marginLeft: index % 2 === 0 ? '0' : '30px'
              }}>
                {/* Timeline Dot */}
                <div style={{
                  position: 'absolute',
                  right: index % 2 === 0 ? '-37px' : 'unset',
                  left: index % 2 === 0 ? 'unset' : '-37px',
                  top: '20px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#fff'
                }} />
                <Text color="medium" style={{ fontSize: '14px', marginBottom: '8px' }}>{project.year}</Text>
                <Heading variant="heading-strong-m">{project.title}</Heading>
                <Text color="medium" style={{ marginTop: '8px' }}>
                  {project.description}
                </Text>
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
              </div>
            </motion.div>
          ))}
        </div>
      </Flex>
    </main>
  );
}
