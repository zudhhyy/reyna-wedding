import Button from '@/components/base/button';
import Image from 'next/image';
import Link from 'next/link';

export default function LocationPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-center font-lucy text-foreground">
      <h1 className="text-5xl font-honeymoon text-primary mb-10">Location</h1>

      <div className="space-y-6 text-lg">
        <p>
          <strong>Date:</strong> October 26, 2025
        </p>
        <p>
          <strong>Time:</strong> 6:00 PM – 11:00 PM
        </p>
        <p>
          <strong>Venue:</strong> International Ballroom
          <br />
          7920 Jones Branch Dr, McLean, VA 22102, United States
        </p>
      </div>

      <div className="mt-10 relative w-full aspect-video max-w-2xl mx-auto rounded overflow-hidden border border-tertiary shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19529.754007476517!2d-77.21677901234088!3d38.92703611483844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64bb90ca45bf5%3A0x771a345fe207701a!2sHilton%20McLean%20Tysons%20Corner!5e0!3m2!1sen!2sid!4v1753384389679!5m2!1sen!2sid"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
        <div className="text-center">
          <div className="text-4xl mb-2">📍</div>
          <p className="text-lg font-medium text-gray-700">Click to view location</p>
          <p className="text-sm text-gray-500">Opens in Google Maps</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <p className="text-sm text-secondary">Click the map above to open directions in Google Maps 📍</p>
      </div>

      <Button className="mx-auto mt-[10%]">
        <Link href="/rsvp">Join the Celebration</Link>
      </Button>
    </section>
  );
}
