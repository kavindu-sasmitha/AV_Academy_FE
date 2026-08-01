import { Mail, Phone, MapPin } from "lucide-react";

// TODO: replace with real contact details and wire the form to an endpoint / mailto.
const CONTACT = {
  email: "hello@avacademy.lk",
  phone: "+94 70 390 8900",
  address: "Maharagama, Western Province, Sri Lanka",
};

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <span className="timecode">00:00:24:10 — GET IN TOUCH</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Questions before you enroll?
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
            Reach out about course content, payment options, or which package
            fits your current skill level.
          </p>

          <div className="mt-9 flex flex-col gap-5">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-teal">
                <Mail size={16} />
              </span>
              {CONTACT.email}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-teal">
                <Phone size={16} />
              </span>
              {CONTACT.phone}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-teal">
                <MapPin size={16} />
              </span>
              {CONTACT.address}
            </div>
          </div>
        </div>

        {/* TODO: wire this form up — POST to a /api/contact route or a mailto/service of your choice */}
        <form className="flex flex-col gap-4 rounded-2xl border border-line/60 bg-surface p-8">
          <div>
            <label className="text-xs text-mist">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="mt-1.5 w-full rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label className="text-xs text-mist">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label className="text-xs text-mist">Message</label>
            <textarea
              rows={4}
              placeholder="What would you like to know?"
              className="mt-1.5 w-full resize-none rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none transition-colors focus:border-teal"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-full bg-teal py-3 text-sm font-semibold text-void transition-colors hover:bg-chalk"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
