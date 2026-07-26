/* eslint-disable no-unused-vars */
import { Mail, Phone, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CONTACT_ITEMS = [
  { icon: Mail, label: "Email", value: `hello@ownsite.app` },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: Clock, label: "Business Hours", value: "Mon – Sat, 9:00 AM – 7:00 PM IST" },
];

const Contact = ()=> {

  const {domainName} = useContext(AuthContext)

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-100">
            Contact
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink dark:text-paper sm:text-4xl">
            Questions before you get started?
          </h2>
        </div>

        <Card className="mx-auto mt-12 max-w-xl">
          <div className="grid divide-y divide-dashed divide-ink/10 dark:divide-paper/10">
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4 px-7 py-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/45 dark:text-paper/45">
                      {item.label}
                    </p>
                    <p className="font-medium text-ink dark:text-paper">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}


export default Contact