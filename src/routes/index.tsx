import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, Mail, Sparkles, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import portrait from "@/assets/rakesh-portrait.jpg";
import dragon from "@/assets/DragonFly.jpeg";
import hand from "@/assets/Hand.jpeg";
import horse from "@/assets/Horse.jpeg";
import humanPortrait from "@/assets/Human1.jpeg";
import tiger from "@/assets/Tiger.jpeg";
import { profile, aboutCards, skills, projects, experience, education } from "../lib/content";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const galleryImages = [
  {
    src: dragon,
    title: "Red Dragon",
    span: "row-span-2",
    alt: "Red Dragon Pencil Drawing",
  },
  {
    src: hand,
    title: "Helping Hands",
    span: "",
    alt: "Helping Hands Graphite Drawing",
  },
  {
    src: horse,
    title: "The Horse",
    span: "",
    alt: "Horse Pencil Drawing",
  },
  {
    src: tiger,
    title: "The Tiger",
    span: "row-span-2",
    alt: "Tiger Graphite Artwork",
  },
  {
    src: humanPortrait,
    title: "Portrait",
    span: "",
    alt: "Graphite Portrait",
  },
];

function Portfolio() {
  return (
    <div id="top" className="relative bg-background text-foreground">
      <Preloader />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Work />
      <Gallery />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-32 md:pt-40">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/3 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-[140px] animate-glow-pulse" />
        <div className="absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-gold/15 blur-[120px] animate-float-slow" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8"
      >
        {/* LEFT — typography */}
        <div className="relative z-10 md:col-span-7 md:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.9 }}
            className="flex items-center gap-3 text-mono text-muted-foreground"
          >
            <span className="h-px w-10 bg-accent" />
            Portfolio
          </motion.div>

          <h1 className="mt-8 text-display text-[clamp(3rem,9vw,8rem)]">
            <RevealLine delay={2.0}>Jella</RevealLine>
            <RevealLine delay={2.15}>
              <span className="italic text-gradient-gold">Rakesh.</span>
            </RevealLine>
          </h1>

          <div className="mt-10 flex items-center gap-3 text-xl md:text-2xl">
            <div className="relative h-8 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={roleIdx}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block text-foreground"
                >
                  {profile.roles[roleIdx]}.
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1 }}
            className="mt-8 max-w-lg text-base text-muted-foreground md:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-3"
          >
            <CtaButton href="#work" variant="primary">
              Explore Work <ArrowUpRight className="h-4 w-4" />
            </CtaButton>
            <a
              href="/Jella_Rakesh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-foreground/40"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <CtaButton href="#contact" variant="ghost">
              <Mail className="h-4 w-4" /> Contact
            </CtaButton>
          </motion.div>
        </div>

        {/* RIGHT — portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 2.0, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative md:col-span-5"
        >
          <motion.div
            style={{ y, scale }}
            className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem] border border-border"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <div className="absolute -inset-px z-20 rounded-[2rem] ring-1 ring-inset ring-foreground/10" />
            <div className="pointer-events-none absolute -inset-10 z-0 bg-accent/30 blur-3xl opacity-60" />
            <img
              src={portrait}
              alt="Jella Rakesh"
              className="relative h-full w-full object-cover grayscale-[15%] contrast-[1.05]"
            />
            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between text-mono text-foreground/80">
              <span>JR</span>
              <span>Jella Rakesh</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mono text-muted-foreground"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          scroll ↓
        </motion.div>
      </motion.div>
    </section>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: [0.2, 0.8, 0.2, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function CtaButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "ghost";
  children: React.ReactNode;
}) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover-magnetic";
  const cls =
    variant === "primary"
      ? `${base} bg-foreground text-background hover:bg-accent hover:text-accent-foreground`
      : `${base} glass text-foreground hover:border-foreground/40`;
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

/* ---------------- MARQUEE ---------------- */

function Marquee() {
  const items = ["Engineer", "Build", "Create", "Sketch", "Learn", "Innovate", "Inspire"];
  return (
    <div className="relative overflow-hidden border-y border-border py-6">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex shrink-0 gap-12 whitespace-nowrap text-display text-4xl text-muted-foreground/70 md:text-6xl"
      >
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="text-[#D4A44B] text-xl mx-6">•</span>{" "}
            <span className="italic">{it}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <Section
      id="about"
      eyebrow="01 · About"
      title={
        <>
          A quiet practice of <em className="text-gradient-gold italic">code & craft</em>.
        </>
      }
    >
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-lg leading-relaxed text-muted-foreground">{profile.bio}</p>
          <div className="mt-8 grid grid-cols-2 gap-6 text-mono text-muted-foreground">
            <div>
              <div className="mb-1 text-foreground/40">Based in</div>
              <div className="text-foreground">{profile.location}</div>
            </div>
            <div>
              <div className="mb-1 text-foreground/40">Available</div>
              <div className="text-foreground">Q1 2026</div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
          {aboutCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className="glass group relative overflow-hidden rounded-2xl p-6 hover-magnetic"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/30" />
              <div className="relative">
                <div className="text-mono text-muted-foreground">0{i + 1}</div>
                <h3 className="mt-4 text-2xl text-foreground">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- SKILLS ---------------- */

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 · Skills"
      title={
        <>
          Tools of the <em className="text-gradient-gold italic">trade.</em>
        </>
      }
    >
      <div className="space-y-2">
        {skills.map((s, gi) => (
          <motion.div
            key={s.group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.05, duration: 0.6 }}
            className="group grid grid-cols-1 items-center gap-4 border-b border-border py-6 md:grid-cols-12"
          >
            <div className="md:col-span-3">
              <div className="text-mono text-muted-foreground">0{gi + 1}</div>
              <h3 className="mt-2 text-2xl text-foreground">{s.group}</h3>
            </div>
            <div className="flex flex-wrap gap-2 md:col-span-9">
              {s.items.map((it) => (
                <span
                  key={it}
                  data-hover
                  className="glass cursor-default rounded-full px-4 py-2 text-sm text-foreground transition-all hover:border-accent/60 hover:text-accent"
                >
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- WORK ---------------- */

function Work() {
  return (
    <Section
      id="work"
      eyebrow="03 · Selected Work"
      title={
        <>
          Beyond <em className="text-gradient-gold italic">Code.</em>
        </>
      }
    >
      <div className="space-y-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.slug}
            href="#"
            data-hover
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            whileHover={{ y: -4 }}
            className="glass group relative block overflow-hidden rounded-3xl p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-gold/0 opacity-0 transition-opacity duration-700 group-hover:opacity-20" />
            <div className="relative grid gap-6 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-2">
                <div className="text-mono text-muted-foreground">{p.year}</div>
                <div className="mt-2 text-mono text-accent">{p.tag}</div>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-display text-4xl text-foreground md:text-6xl">{p.title}</h3>
                <p className="mt-4 max-w-xl text-muted-foreground">{p.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="text-mono text-muted-foreground">
                      {s} ·
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-end justify-end md:col-span-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowUpRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- GALLERY ---------------- */

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Section
      id="gallery"
      eyebrow="04 · Art Gallery"
      title={
        <>
          Beyond <em className="text-gradient-gold italic">Code.</em>
        </>
      }
    >
      <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground leading-8">
        Sketching is where I slow down and refine observation, patience, and precision. These
        qualities influence how I approach software engineering - designing solutions with
        creativity, discipline, and attention to detail.
      </p>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[220px] md:gap-4">
        {galleryImages.map((g, i) => (
          <motion.button
            key={i}
            onClick={() => setOpen(g.src)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            data-hover
            className={`group relative overflow-hidden rounded-2xl border border-border ${g.span}`}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="p-6">
                <h3 className="text-lg font-serif text-white">{g.title}</h3>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/95 backdrop-blur-xl p-6"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full glass"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              src={open}
              alt=""
              className="max-h-[88vh] max-w-[88vw] rounded-2xl object-contain shadow-[var(--shadow-cinema)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------------- TIMELINE ---------------- */

function Timeline() {
  const items = [
    ...experience.map((e) => ({ ...e, kind: "Experience" as const })),
    ...education.map((e) => ({
      role: e.school,
      org: e.org,
      period: e.period,
      body: e.body,
      kind: "Education" as const,
    })),
  ];
  return (
    <Section
      id="timeline"
      eyebrow="05 · Journey"
      title={
        <>
          A short <em className="text-gradient-gold italic">timeline.</em>
        </>
      }
    >
      <div className="relative">
        <div className="absolute left-3 top-0 h-full w-px bg-border md:left-1/2" />
        <div className="space-y-12">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className={`relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 ${
                i % 2 === 0 ? "md:text-right" : "md:[&>*:first-child]:order-2"
              }`}
            >
              <div className="pl-10 md:pl-0">
                <div className="text-mono text-accent">
                  {it.kind} · {it.period}
                </div>
                <h3 className="mt-2 text-2xl text-foreground">{it.role}</h3>
                <div className="mt-1 text-muted-foreground">{it.org}</div>
                <p className="mt-3 text-sm text-muted-foreground md:max-w-sm md:ml-auto">
                  {it.body}
                </p>
              </div>
              <div className="hidden md:block" />
              <span className="absolute left-3 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-accent ring-4 ring-background md:left-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- CONTACT ---------------- */
const socialLinks = [
  {
    icon: <FaGithub size={18} />,
    href: "https://github.com/rakki2024",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin size={18} />,
    href: "https://linkedin.com/in/j-rakesh-bb8213256",
    label: "LinkedIn",
  },
  {
    icon: <FaYoutube size={18} />,
    href: "https://youtube.com/@rakkibhaigaming?si=qKzkOr2QlTU5KFZ9",
    label: "YouTube",
  },
  {
    icon: <FaInstagram size={18} />,
    href: "https://instagram.com/rakki953",
    label: "Instagram",
  },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // Save reference before await
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      form.reset(); // Reset form safely
      setSent(true); // Show success animation
    } catch (error: any) {
      console.error("EmailJS Error:", error);

      alert(
        `Status: ${error?.status ?? "Unknown"}\n\nText: ${
          error?.text ?? "Unknown"
        }\n\nMessage: ${error?.message ?? "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="06 · Contact"
      title={
        <>
          Let's make something <em className="text-gradient-gold italic">memorable.</em>
        </>
      }
    >
      <div className="grid gap-16 md:grid-cols-12">
        {/* LEFT */}
        <div className="md:col-span-5">
          <p className="text-lg leading-8 text-muted-foreground">
            Whether you have an opportunity, collaboration, or just want to connect, I'd love to
            hear from you.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="block normal-case text-foreground transition-colors hover:text-accent"
            >
              {profile.email}
            </a>

            <div className="flex gap-3">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  data-hover
                  className="glass flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="glass flex flex-col items-center justify-center rounded-3xl p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    delay: 0.2,
                  }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground"
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>

                <h3 className="text-3xl font-semibold">Thank You!</h3>

                <p className="mt-3 max-w-md text-muted-foreground">
                  Your message has been sent successfully.
                  <br />
                  I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass space-y-5 rounded-3xl p-8"
              >
                <Field label="Name" name="from_name" />

                <Field label="Email" name="from_email" type="email" />

                <Field label="Message" name="message" textarea />

                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition-all duration-300 hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "peer w-full bg-transparent border-0 border-b border-border px-1 pt-6 pb-2 text-foreground outline-none transition-colors focus:border-accent placeholder-transparent";
  return (
    <div className="relative">
      {textarea ? (
        <textarea required id={name} name={name} placeholder={label} rows={4} className={cls} />
      ) : (
        <input required id={name} name={name} type={type} placeholder={label} className={cls} />
      )}
      <label
        htmlFor={name}
        className="text-mono pointer-events-none absolute left-1 top-1 text-muted-foreground transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-mono peer-focus:text-accent"
      >
        {label}
      </label>
    </div>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border py-16">
      <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 max-w-4xl bg-accent/10 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <div className="text-display text-[clamp(4rem,15vw,12rem)] leading-none text-foreground/90">
          JR<span className="text-accent">.</span>
        </div>
        <p className="text-mono text-muted-foreground">
          Designed & Built by Rakesh · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

/* ---------------- SECTION SHELL ---------------- */

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-32 md:py-48">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="mb-16 md:mb-24"
      >
        <div className="text-mono text-muted-foreground">{eyebrow}</div>
        <h2 className="mt-6 max-w-3xl text-display text-5xl text-foreground md:text-7xl">
          {title}
        </h2>
      </motion.div>
      {children}
    </section>
  );
}
