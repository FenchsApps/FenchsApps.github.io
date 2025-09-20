'use client';

import Link from 'next/link';
import { Github, Star, GitFork, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Background from '@/components/background';
import { useState, useEffect } from 'react';
import Loading from './loading';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch('https://api.github.com/users/FenchsApps/repos?sort=updated&per_page=100');
    if (!res.ok) {
      console.error('Failed to fetch GitHub repos:', res.status, res.statusText);
      return [];
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      const fetchedRepos = await getRepos();
      setRepos(fetchedRepos);
      setLoading(false);
    };
    fetchRepos();
  }, []);

  const groupedRepos = repos.reduce<Record<string, Repo[]>>((acc, repo) => {
    const lang = repo.language || 'Other';
    if (!acc[lang]) {
      acc[lang] = [];
    }
    acc[lang].push(repo);
    return acc;
  }, {});

  const sortedLanguages = Object.keys(groupedRepos).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return groupedRepos[b].length - groupedRepos[a].length;
  });

  return (
    <>
      <Background />
      <div className="relative z-10">
        <header className="absolute top-0 right-0 p-4 md:p-8">
          <Button asChild variant="outline" className="bg-card/30 backdrop-blur-sm border-white/10 hover:border-primary transition-all duration-300">
            <a href="https://fenchsapps.github.io/app-navigator" target="_blank" rel="noopener noreferrer">
              <Rocket className="mr-2 h-4 w-4" />
              App Navigator
            </a>
          </Button>
        </header>
        <main className="flex flex-col items-center min-h-screen p-4 md:p-8 lg:p-12 overflow-hidden">
          <div className="w-full max-w-4xl text-center mt-12 md:mt-24">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-purple-400">
              Welcome
            </h1>
            <p className="mt-2 text-xl md:text-3xl font-light text-muted-foreground">
              FenchsApps
            </p>
          </div>

          {loading ? (
            <div className="w-full max-w-6xl mt-16 md:mt-32">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="flex flex-col space-y-3 p-4 border border-white/10 rounded-lg bg-card/30 h-[180px]">
                     <div className="h-5 w-[150px] bg-white/10 animate-pulse rounded-md" />
                     <div className="space-y-2 flex-grow">
                       <div className="h-4 w-full bg-white/10 animate-pulse rounded-md" />
                       <div className="h-4 w-[200px] bg-white/10 animate-pulse rounded-md" />
                     </div>
                     <div className="flex justify-between pt-2">
                       <div className="h-4 w-[50px] bg-white/10 animate-pulse rounded-md" />
                       <div className="h-4 w-[50px] bg-white/10 animate-pulse rounded-md" />
                     </div>
                   </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-6xl mt-16 md:mt-32">
              {sortedLanguages.map((lang) => (
                <section key={lang} className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-white">
                    {lang}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedRepos[lang].map((repo) => (
                      <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
                        <Card className="bg-card/30 backdrop-blur-sm border-white/10 hover:border-primary transition-all duration-300 h-full flex flex-col group transform hover:-translate-y-1">
                          <CardHeader>
                            <CardTitle className="group-hover:text-primary transition-colors">{repo.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <CardDescription>{repo.description || 'No description provided.'}</CardDescription>
                          </CardContent>
                          <CardFooter className="flex justify-between text-sm text-muted-foreground mt-auto">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              <span>{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GitFork className="w-4 h-4" />
                              <span>{repo.forks_count}</span>
                            </div>
                          </CardFooter>
                        </Card>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          <div className="my-12 text-center">
            <Button asChild size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/30 transition-all transform hover:scale-105">
              <a href="https://github.com/FenchsApps" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                Visit GitHub
              </a>
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}
