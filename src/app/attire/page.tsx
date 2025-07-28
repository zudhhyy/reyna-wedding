'use client';

import Link from 'next/link';
import Button from '@/components/base/button';
import { useScrollToNext } from '@/hooks/useScrollToNext';

export default function AttirePage() {
  useScrollToNext({ nextPage: '/location' });

  return (
    <section className="animate-fade-in max-w-2xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-around gap-14">
      <h1 className="text-5xl font-honeymoon text-primary font-bold">Attire</h1>

      <p className="text-lg font-lucy text-foreground">
        While not required, we invite our guests to celebrate with us in{' '}
        <span className="text-secondary font-semibold">Desi / Pakistani wear</span> to honor our cultural traditions and add a touch of
        elegance to the evening.
      </p>

      <Button>
        <Link href="/gallery">Continue</Link>
      </Button>
    </section>
  );
}
