const About = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-100">
              About OwnStore
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink dark:text-paper sm:text-4xl">
              Built for the shop next door, not the enterprise upstairs
            </h2>
          </div>
          <div className="space-y-5 text-balance text-base leading-relaxed text-ink-light dark:text-paper/70">
            <p>
              OwnStore is a simple way for small business owners to put their shop online without
              hiring a developer or learning to code. Add your business details, upload your
              products with photos and prices, and get a store page you can share anywhere — on
              WhatsApp status, Instagram, or a signboard QR code.
            </p>
            <p>
              We built OwnStore especially for small businesses: local boutiques, home bakers,
              handicraft sellers, and neighbourhood shops who want to be found online without the
              cost or complexity of a full e-commerce platform. There's no payment gateway to set
              up in this first version — orders come to you directly on WhatsApp or Email, so you
              stay in control of every sale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


export default About;