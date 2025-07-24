import Button from '@/components/base/button';
import Link from 'next/link';

export default function RegistryPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16 text-center font-lucy text-foreground">
      <h1 className="text-5xl font-honeymoon text-primary mb-10">Registry</h1>

      <div className="space-y-6 text-lg">
        <p>Your presence is the greatest gift we could ask for.</p>

        <p>
          We kindly ask for <span className="text-secondary font-semibold">no boxed gifts</span>.
        </p>

        <p>If you would like to bless us further, we welcome contributions toward:</p>

        <ul className="list-none space-y-3 text-secondary font-semibold">
          <li>🎉 Our honeymoon</li>
          <li>🏡 Our new home</li>
        </ul>

        <div className="mt-10 space-y-4 text-base text-foreground">
          <p>
            <strong>Zelle:</strong> <span className="text-secondary">301-768-2377</span>
          </p>
          <p>
            <strong>Venmo:</strong> <span className="text-secondary">@reyna-hadhiman</span>
          </p>
          <p>
            <strong>Envelope:</strong> We will have a special place for envelopes at the wedding 💌
          </p>
        </div>

        <Button className="mx-auto mt-[25%]">
          <Link href="/location">See the location</Link>
        </Button>
      </div>
    </section>
  );
}
