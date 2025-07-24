'use client';

import Button from '@/components/base/button';
import Link from 'next/link';
import { useState } from 'react';

export default function RSVPPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to backend
    setIsAnimating(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="animate-fade-in max-w-xl mx-auto px-4 py-16 font-lucy text-foreground">
      {submitted ? (
        <div className="max-w-2xl mx-auto px-4 py- text-center font-lucy text-foreground">
          <h1 className="text-5xl font-honeymoon text-primary mb-10">Thank You</h1>

          <p className="text-lg leading-relaxed">
            From the bottom of our hearts, thank you for being part of our journey.
            <br />
            Your love, blessings, and presence mean the world to us.
          </p>

          <p className="text-lg mt-6 leading-relaxed">
            Whether near or far, we feel truly grateful to have you in our lives.
            <br />
            We can’t wait to start this next chapter — surrounded by such love 💕
          </p>

          <p className="mt-12 text-secondary font-semibold text-base">
            With all our love,
            <br />
            Wasiq & Reyna
          </p>

          <Button className="mx-auto mt-[20%]">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-honeymoon text-primary text-center mb-10">RSVP</h1>

          <form
            onSubmit={handleSubmit}
            className={`space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95 transform' : 'opacity-100 scale-100'}`}
          >
            <div>
              <label className="block mb-1 text-secondary" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 rounded border border-tertiary bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div>
              <label className="block mb-1 text-secondary" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full px-4 py-2 rounded border border-tertiary bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div>
              <label className="block mb-1 text-secondary" htmlFor="message">
                Message for the couple
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 rounded border border-tertiary bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isAnimating}
              className="mt-4 w-full bg-primary text-white py-3 rounded hover:bg-secondary transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnimating ? 'Sending...' : 'Send RSVP'}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
