import { ArrowRight, Check, MessageCircle, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TICKET_LINES = [
  { name: "Handloom Cotton Saree", qty: 1, price: "₹1,899" },
  { name: "Brass Table Lamp", qty: 2, price: "₹1,240" },
  { name: "Clay Diffuser Set", qty: 1, price: "₹560" },
];

const Hero = ({ onGetStarted, onLearnMore }) => {
  const { domainName } = useContext(AuthContext);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-textured pb-20 pt-14 md:pb-28 md:pt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-gold-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[-10%] h-96 w-96 rounded-full bg-teal-500/15 blur-3xl"
      />

      <div className="container relative grid items-center gap-16 md:grid-cols-2">
        {/* Left column — copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-600 backdrop-blur-sm dark:border-paper/10 dark:bg-night-card/60 dark:text-teal-100">
            No code · No payment gateway needed
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink dark:text-paper sm:text-5xl lg:text-[3.4rem]">
            Build your business
            <span className="relative mx-2 inline-block whitespace-nowrap text-teal-500">
              website
              <svg
                className="absolute -bottom-2 left-0 w-full text-gold-500"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C40 2 160 2 198 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            in minutes.
          </h1>

          <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-ink-light dark:text-paper/70">
            {domainName} turns your shop into a shareable online store — add
            products, send the link to customers, and take orders straight to
            WhatsApp or Email. Nothing to install, nothing to configure.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={onGetStarted} className="group">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline" onClick={onLearnMore}>
              Learn More
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-ink-light dark:text-paper/60">
            <div className="flex -space-x-2">
              {["#0F6B5C", "#E8A93B", "#1C8D77", "#CE8F22"].map((c, i) => (
                <span
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-paper dark:border-night"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <p>Trusted by neighbourhood shops going online, every day.</p>
          </div>
        </div>

        {/* Right column — signature order-ticket mockup */}
        <div className="relative mx-auto w-full max-w-sm animate-float-slow md:max-w-md">
          <div className="relative rounded-[28px] border border-ink/10 bg-white/70 p-3 shadow-2xl shadow-teal-900/10 backdrop-blur-sm dark:border-paper/10 dark:bg-night-card/70">
            <div className="rounded-[20px] bg-teal-500 px-5 py-3">
              <p className="font-display text-sm font-semibold text-white/90">
                Meera's Home Store
              </p>
              <p className="font-mono text-[11px] text-white/70">
                ordered via {domainName}.link/meera
              </p>
            </div>

            {/* printer slot */}
            <div className="mx-6 h-1.5 rounded-full bg-ink/10 dark:bg-paper/10" />

            {/* the ticket, "printing" out */}
            <div className="relative mt-1 animate-print-out rounded-b-xl bg-receipt p-5 font-mono text-ink shadow-inner">
              <div className="perforated-edge -mt-5 mb-3" />
              <p className="text-xs uppercase tracking-widest text-ink/50">
                New order · #0842
              </p>
              <div className="mt-4 space-y-3">
                {TICKET_LINES.map((line, i) => (
                  <div
                    key={line.name}
                    className="flex items-start justify-between gap-3 border-b border-dashed border-ink/15 pb-3 text-sm animate-ticket-line"
                    style={{ animationDelay: `${0.4 + i * 0.25}s` }}
                  >
                    <span className="leading-tight">
                      {line.name}
                      <span className="block text-xs text-ink/50">
                        Qty {line.qty}
                      </span>
                    </span>
                    <span className="whitespace-nowrap font-semibold">
                      {line.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                <span>Total</span>
                <span>₹3,699</span>
              </div>

              <div
                className="mt-5 flex items-center justify-between gap-2 rounded-xl bg-teal-50 px-3 py-2.5 animate-ticket-line"
                style={{ animationDelay: "1.2s" }}
              >
                <span className="flex items-center gap-2 text-xs font-semibold text-teal-700">
                  <MessageCircle className="h-4 w-4" /> Sent to WhatsApp
                </span>
                <Check className="h-4 w-4 text-teal-600" />
              </div>

              <Scissors
                className="absolute -bottom-3 right-4 h-4 w-4 rotate-90 text-ink/20"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
