'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

interface HomeCardProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export default function HomeCard({ title, icon, href }: HomeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href} className="block w-full">
      <Card
        className={cn(
          'w-full max-w-md mx-auto overflow-hidden transition-all duration-300 ease-in-out',
          'border border-border/40 bg-card hover:bg-card/80',
          'shadow-md hover:shadow-xl transform hover:-translate-y-1',
          isHovered ? 'ring-2 ring-primary/20' : ''
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className='p-6 flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-card-foreground transition-colors duration-200'>
            {title}
          </h2>
          <div
            className={cn(
              'p-3 rounded-full bg-primary/10 text-primary',
              'transition-all duration-300 ease-in-out',
              isHovered ? 'bg-primary/20 scale-110 rotate-12' : ''
            )}
          >
            {icon}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
