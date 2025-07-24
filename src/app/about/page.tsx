'use client';

import Image from 'next/image';
import Button from '@/components/base/button';
import Link from 'next/link';

import ReynaImg from '@/assets/images/potrait/reyna.webp';
import WasiqImg from '@/assets/images/potrait/wasiq.webp';

export default function AboutPage() {

  return (
    <section className="animate-fade-in h-[calc(100vh-120px)] max-w-3xl mx-auto px-4 py-16 text-center space-y-10">
      <h1 className="text-5xl font-honeymoon text-primary">About the Couple</h1>

      <div className="flex items-center justify-center gap-4">
        <Image src={WasiqImg} alt="Wasiq" width={100} height={100} className="rounded-full" />
        <Image src={ReynaImg} alt="Reyna" width={100} height={100} className="rounded-full" />
      </div>

      <div className="space-y-6 text-lg font-lucy text-foreground flex flex-col items-center">
        <p>
          Wasiq is the cherished son of
          <br />
          <span className="text-secondary font-semibold">Saeed Ahmed</span>
          <br />
          and
          <br />
          <span className="text-secondary font-semibold">Wajeeha Saeed</span>.
        </p>

        <p>
          Reyna is the beloved daughter of
          <br />
          <span className="text-secondary font-semibold">Nugroho A. Hadhiman</span>
          <br />
          and
          <br />
          <span className="text-secondary font-semibold">Ratu S. Hadhiman</span>.
        </p>

        <Button className="mt-[25%]">
          <Link href="/attire">Join the Celebration</Link>
        </Button>
      </div>
    </section>
  );
}
