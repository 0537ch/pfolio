"use client";

import React from 'react';
import { Heading, Text, Flex, Button } from '@/once-ui/components';
import { motion } from 'framer-motion';

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
	},
	{
		year: '2020',
		title: 'Social Media Dashboard',
		description: 'A comprehensive social media analytics dashboard that aggregates data from multiple platforms. Features real-time updates and customizable widgets.',
		technologies: ['Vue.js', 'Python', 'Redis']
	},
	{
		year: '2019',
		title: 'Weather Application',
		description: 'A weather forecasting application that provides real-time weather data and forecasts. Features include location-based weather updates and interactive maps.',
		technologies: ['React Native', 'Node.js', 'Weather API']
	},
	{
		year: '2018',
		title: 'Portfolio Website',
		description: 'A personal portfolio website built with modern web technologies. Features a responsive design and interactive UI elements.',
		technologies: ['React', 'Tailwind CSS', 'Framer Motion']
	}
];

export default function Projects() {
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
							key={index}
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
								<div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
									{project.technologies.map((technology, index) => (
										<Text color="medium" style={{ 
											padding: '4px 8px',
											borderRadius: '4px',
											backgroundColor: 'rgba(255, 255, 255, 0.1)',
											fontSize: '14px'
										}} key={index}>{technology}</Text>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</Flex>
		</main>
	);
}
