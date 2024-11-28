"use client";

import React, { useState, useEffect } from 'react';
import { Heading, Text, Button, Grid } from '@/once-ui/components';
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
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading>Projects</Heading>
        <Text color="medium">
          Here are some of the projects I&apos;ve worked on. Each project represents a unique challenge and learning experience.
        </Text>
      </div>

      <Grid className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={styles.projectCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}>
            {project.image && (
              <div className={styles.imageContainer}>
                <img src={project.image} alt={project.title} />
              </div>
            )}
            <div className={styles.content}>
              <div className={styles.projectHeader}>
                <Heading variant="heading-strong-s">{project.title}</Heading>
                <Text color="medium" style={{ fontSize: '14px' }}>{project.year}</Text>
              </div>
              <Text color="medium">{project.description}</Text>
              <div className={styles.actions}>
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
      </Grid>
    </div>
  );
}
