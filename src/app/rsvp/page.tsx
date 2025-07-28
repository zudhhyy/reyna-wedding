'use client';

import Button from '@/components/base/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface RSVPSubmission {
  id: string;
  name: string;
  attendance: string;
  phone: string;
  message: string;
  timestamp: string;
}

export default function RSVPPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes',
    phone: '',
    message: ''
  });
  const [allSubmissions, setAllSubmissions] = useState<RSVPSubmission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

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
        await refreshSubmissions(); // Refresh the messages table
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

  // Fetch all submissions to display messages
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/rsvp');
        if (response.ok) {
          const data = await response.json();
          setAllSubmissions(data.submissions || []);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoadingSubmissions(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Refresh submissions after successful submission
  const refreshSubmissions = async () => {
    try {
      const response = await fetch('/api/rsvp');
      if (response.ok) {
        const data = await response.json();
        setAllSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.error('Error refreshing submissions:', error);
    }
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

            <Button
              type="submit"
              disabled={isAnimating}
              className="mt-4 w-full flex items-center justify-center bg-primary text-white py-3 rounded hover:bg-secondary transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnimating ? 'Sending...' : 'Send RSVP'}
            </Button>
          </form>

          {/* Messages from other guests */}
          <div className="mt-16">
            <h2 className="text-3xl font-honeymoon text-primary text-center mb-8">Messages from Our Guests</h2>
            
            {loadingSubmissions ? (
              <div className="text-center py-8">
                <p className="text-secondary">Loading messages...</p>
              </div>
            ) : allSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-secondary">Be the first to leave a message! 💕</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {allSubmissions
                  .filter(submission => submission.message && submission.message.trim() !== '')
                  .map((submission) => (
                    <div key={submission.id} className="bg-background border border-tertiary rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">{submission.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.attendance === 'yes' ? 'bg-green-100 text-green-700' :
                          submission.attendance === 'no' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {submission.attendance === 'yes' ? 'Attending' : 
                           submission.attendance === 'no' ? 'Not Attending' : 'Maybe'}
                        </span>
                      </div>
                      <p className="text-secondary text-sm mb-2">
                        {new Date(submission.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="text-foreground leading-relaxed">{submission.message}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
