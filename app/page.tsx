"use client"

import Link from "next/link"
import { Container, Database, Layers, Server, Terminal, Trophy } from "lucide-react"
import { AnimatedCard } from "@/components/animated-card"
import { CodeBlock } from "@/components/code-block"
import { OrbitalVisualization } from "@/components/orbital-visualization"
import ThemeToggle from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden transition-theme">

      <div className="absolute inset-0 z-0 overflow-hidden">

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
          <OrbitalVisualization />
        </div>

        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />


        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2 group">
          <Container className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-mono text-xl font-bold tracking-tight relative">
            d'Opstar
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/game" className="relative group flex items-center gap-1 px-3 py-1.5 overflow-hidden">
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full transition-all duration-300 group-hover:w-full"></span>
            <Terminal className="h-4 w-4 text-primary group-hover:text-primary group-hover:rotate-12 transition-all duration-300" />
            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300 relative z-10">
              Play
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/leaderboard" className="relative group flex items-center gap-1 px-3 py-1.5 overflow-hidden">
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full transition-all duration-300 group-hover:w-full"></span>
            <Trophy className="h-4 w-4 text-primary group-hover:text-primary group-hover:rotate-12 transition-all duration-300" />
            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300 relative z-10">
              Leaderboard
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center gap-6 mb-8">
            <div className="relative">
              <Container className="h-10 w-10 text-primary animate-pulse-slow" />
            </div>
            <div className="relative">
              <Server className="h-10 w-10 text-primary/80" />
            </div>
            <div className="relative">
              <Database className="h-10 w-10 text-primary/60" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Master the Art of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/80 to-primary relative">
              Container Orchestration
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary/80 to-primary"></span>
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A DevOps puzzle game where you arrange Docker, Docker Compose, and Kubernetes configurations in the correct
            order to deploy applications successfully.
          </p>

          <div className="pt-8">
            <Link href="/game" className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-75 blur-md group-hover:opacity-100 transition duration-500"></div>
              <button className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-purple-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-[0_5px_15px_rgba(89,51,146,0.4)] hover:shadow-[0_8px_25px_rgba(89,51,146,0.6)] transition-all duration-300 hover:-translate-y-1">
                <span className="z-10 flex items-center">
                  Start Game
                  <Terminal className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-purple-500 rounded-full z-0"></span>
                <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 group-hover:w-full z-0"></span>
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <AnimatedCard className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border" delay={0.1}>
            <Layers className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Docker Mastery</h3>
            <p className="text-muted-foreground">
              Arrange container configurations and optimize Dockerfiles for efficient deployments.
            </p>
          </AnimatedCard>

          <AnimatedCard className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border" delay={0.3}>
            <Container className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Compose Challenge</h3>
            <p className="text-muted-foreground">
              Structure multi-container applications with the perfect Docker Compose setup.
            </p>
          </AnimatedCard>

          <AnimatedCard className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border" delay={0.5}>
            <Server className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">K8s Puzzles</h3>
            <p className="text-muted-foreground">
              Test your Kubernetes knowledge by arranging complex deployment manifests.
            </p>
          </AnimatedCard>
        </div>
      </main>

      <footer className="relative z-10 p-6 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} d'Opstar • A DevOps Learning Game</p>
      </footer>


      <CodeBlock
        code={`version: '3'
services:
  web:
    image: nginx
    ports:
      - "80:80"
  db:
    image: postgres
    volumes:
      - data:/var/lib/postgresql`}
        className="absolute bottom-10 left-10 opacity-20 text-primary hidden lg:block"
        delay={1000}
      />

      <CodeBlock
        code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web`}
        className="absolute top-20 right-10 opacity-20 text-primary/80 hidden lg:block"
        delay={2000}
      />
    </div>
  )
}
