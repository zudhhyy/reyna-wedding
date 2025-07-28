'use client';

import Button from '@/components/base/button';
import Link from 'next/link';
import { useState } from 'react';

export default function RSVPPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes',
    phone: '',
    message: ''
  });

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsAnimating(false);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleNext();
      } else {
        console.error('Failed to submit RSVP');
        // You could add error handling here
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      // You could add error handling here
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="animate-fade-in max-w-xl mx-auto px-4 py-16 flex flex-col justify-around font-lucy text-foreground">
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
            Reyna & Wasiq
          </p>

          <Button className="mx-auto mt-[20%]">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      ) : (
        <div className={`space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95 transform' : 'opacity-100 scale-100'}`}>
          <h1 className="text-5xl font-honeymoon text-primary text-center mb-10">RSVP</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-secondary" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded border border-tertiary bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div>
              <label className="block mb-1 text-secondary" htmlFor="attendance">
                Will you attend our wedding?
              </label>
              <select
                id="attendance"
                name="attendance"
                value={formData.attendance}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border border-tertiary bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="yes">Yes, I will attend</option>
                <option value="no">No, I cannot attend</option>
                <option value="maybe">Maybe, I&apos;m not sure yet</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-secondary" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
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
                name="message"
                value={formData.message}
                onChange={handleInputChange}
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
        </div>
      )}
    </section>
  );
}
