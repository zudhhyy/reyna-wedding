'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useScrollToNext } from '@/hooks/useScrollToNext';

import Button from '@/components/base/button';

import LogoImg from '@/assets/images/logo.png';

export default function Home() {
  useScrollToNext({ nextPage: '/about' });

  return (
    <section className="animate-fade-in flex items-center justify-center px-4">
      <div className="text-center max-w-2xl space-y-6 flex flex-col items-center">
        <Image src={LogoImg} alt="Logo" width={300} height={300} />

        <h1 className="text-5xl md:text-6xl font-honeymoon-bold text-primary">Reyna & Wasiq&apos;s Reception</h1>

        <p className="text-base md:text-xl text-primary">
          Come celebrate in the International Ballroom
          <br />
          7920 Jones Branch Dr, McLean, VA 22102
        </p>

        <p className="text-base md:text-xl text-primary">
          October 26, 2025
          <br />
          6:00 PM - 11:00 PM
        </p>

        <Button className="mt-5">
          <Link href="/about">Open invitation</Link>
        </Button>
      </div>
    </section>
  );
}
