import { useEffect, useState, type PointerEvent } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Scene3D from "./three/Scene3D";
import { profile, projects, skills } from "./data";

const navItems = ["About", "Skills", "Projects", "Contact"];

function Header({ isHelloPage = false }: { isHelloPage?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={isHelloPage ? "header hello-header" : "header"}>
      <a className="brand" href="#home" aria-label="Lakshan Perera home">LP<span>.</span></a>
      {isHelloPage ? (
        <nav className="nav">
          <a className="nav-cta" href="#home">Back to portfolio <ArrowUpRight size={15} /></a>
        </nav>
      ) : (
        <>
          <nav className={open ? "nav nav-open" : "nav"}>
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>
            ))}
            <a className="nav-cta" href="#hello" onClick={() => setOpen(false)}>Let's talk <ArrowUpRight size={15} /></a>
          </nav>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>
        </>
      )}
    </header>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading">
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {description && <p className="section-description">{description}</p>}
  </div>;
}

function updatePointerGlow(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  event.currentTarget.style.setProperty("--pointer-opacity", "1");
}

function clearPointerGlow(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--pointer-opacity", "0");
}

function Hero() {
  const reduceMotion = useReducedMotion();
  return <section className="hero section-wrap" id="home">
    <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      <div className="availability"><span className="status-dot" /> Available for opportunities</div>
      <p className="eyebrow">HELLO, I'M</p>
      <h1>Lakshan<br /><span>Perera.</span></h1>
      <h2>Full-Stack Developer <i>·</i> Cloud Engineer</h2>
      <p className="hero-description">{profile.intro}</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#projects">Explore projects <ArrowUpRight size={17} /></a>
        <a className="button button-quiet" href="#contact">Get in touch</a>
      </div>
      <div className="hero-socials">
        <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
      </div>
    </motion.div>
    <div className="hero-visual" aria-label="Abstract animated 3D object">
      <div className="visual-glow" />
      <Scene3D />
      <div className="orbit-label label-top">CREATIVE DEVELOPMENT</div>
      <div className="orbit-label label-bottom">WEB · CLOUD · CODE</div>
    </div>
    <a className="scroll-cue" href="#about"><span /> Scroll to explore</a>
  </section>;
}

function About() {
  return <section className="section-wrap content-section interactive-section" id="about" onPointerMove={updatePointerGlow} onPointerLeave={clearPointerGlow}>
    <div className="pointer-glow" aria-hidden="true" />
    <SectionHeading eyebrow="01 / ABOUT" title="A little about me." description="Curious by nature. Developer by choice." />
    <div className="about-grid">
      <div className="about-main">
        <p className="large-copy">I enjoy creating useful digital experiences through clean code, thoughtful design and continuous learning.</p>
        <p className="muted-copy">My background combines hands-on technical support experience with formal IT studies and practical web development. I'm currently growing my skills across full-stack development, cloud computing and DevOps.</p>
      </div>
      <div className="about-facts">
        <div><span>01</span><p>Problem solving<br /><small>Practical, user-focused thinking</small></p></div>
        <div><span>02</span><p>Continuous learning<br /><small>Exploring modern technologies</small></p></div>
        <div><span>03</span><p>Building for impact<br /><small>From idea to working product</small></p></div>
      </div>
    </div>
  </section>;
}

function Skills() {
  return <section className="section-wrap content-section interactive-section" id="skills" onPointerMove={updatePointerGlow} onPointerLeave={clearPointerGlow}>
    <div className="pointer-glow" aria-hidden="true" />
    <SectionHeading eyebrow="02 / TOOLKIT" title="Technologies I work with." description="A growing toolkit for building across the stack." />
    <div className="skills-grid">
      {skills.map((group, i) => <motion.div className="skill-card" key={group.group} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <span className="card-index">0{i + 1}</span>
        <h3>{group.group}</h3>
        <div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div>
      </motion.div>)}
    </div>
  </section>;
}

function Projects() {
  return <section className="section-wrap content-section interactive-section" id="projects" onPointerMove={updatePointerGlow} onPointerLeave={clearPointerGlow}>
    <div className="pointer-glow" aria-hidden="true" />
    <SectionHeading eyebrow="03 / SELECTED WORK" title="Things I've been building." description="A selection of projects and learning experiences." />
    <div className="projects-list">
      {projects.map(project => <article className="project-card" key={project.number}>
        <div className="project-number">{project.number}</div>
        <div className="project-info">
          <p className="project-type">{project.type}</p>
          <h3>{project.name}</h3>
          <p className="muted-copy">{project.description}</p>
          <div className="project-stack">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub`}><Github /></a>
          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}><ArrowUpRight /></a>}
        </div>
      </article>)}
    </div>
  </section>;
}

function Contact() {
  const reduceMotion = useReducedMotion();
  const contactVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.3 : 0.65,
        ease: "easeOut" as const,
        staggerChildren: reduceMotion ? 0 : 0.14,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.3 : 0.5, ease: "easeOut" as const },
    },
  };
  return <motion.section
    className="section-wrap contact-section"
    id="contact"
    onPointerMove={updatePointerGlow}
    onPointerLeave={clearPointerGlow}
    variants={contactVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
  >
    <div className="pointer-glow" aria-hidden="true" />
    <motion.p className="eyebrow" variants={itemVariants}>04 / CONTACT</motion.p>
    <motion.h2 variants={itemVariants}>Have a project<br />in <span>mind?</span></motion.h2>
    <motion.p className="muted-copy" variants={itemVariants}>I'm interested in opportunities to learn, collaborate and build meaningful products.</motion.p>
    <motion.a className="button button-primary contact-button" href="#hello" variants={itemVariants}>Say hello <ArrowUpRight size={17} /></motion.a>
    <motion.div className="contact-links" variants={itemVariants}>
      <a href={`mailto:${profile.email}`}><Mail size={17} /> Email</a>
      <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
    </motion.div>
  </motion.section>;
}

function HelloPage() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 20 });
  const orbX = useTransform(smoothX, [-1, 1], [-22, 22]);
  const orbY = useTransform(smoothY, [-1, 1], [-18, 18]);
  const orbRotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const orbRotateY = useTransform(smoothX, [-1, 1], [-10, 10]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return <main className="hello-page" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
    <motion.section
      className="hello-content"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <p className="eyebrow">LET'S CONNECT</p>
      <h1>Say <span>hello.</span></h1>
      <p className="hello-intro">Have a question, an opportunity, or an idea you’d like to explore? I’d love to hear from you.</p>
      <a className="hello-email" href={`mailto:${profile.email}`}>
        <Mail size={19} />
        <span>{profile.email}</span>
        <ArrowUpRight size={18} />
      </a>
      <p className="hello-social-label">You can also find me here</p>
      <div className="hello-socials">
        <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a>
      </div>
      <a className="hello-back" href="#home">← Back to the portfolio</a>
    </motion.section>
    <motion.div
      className="hello-orb"
      aria-hidden="true"
      style={{ x: reduceMotion ? 0 : orbX, y: reduceMotion ? 0 : orbY, rotateX: reduceMotion ? 0 : orbRotateX, rotateY: reduceMotion ? 0 : orbRotateY }}
    />
  </main>;
}

export default function App() {
  const [isHelloPage, setIsHelloPage] = useState(() => window.location.hash === "#hello");

  useEffect(() => {
    const handle = () => document.body.classList.toggle("is-scrolled", window.scrollY > 20);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const handleHashChange = () => setIsHelloPage(window.location.hash === "#hello");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (!isHelloPage && window.location.hash === "#home") {
      document.getElementById("home")?.scrollIntoView();
    }
  }, [isHelloPage]);

  if (isHelloPage) {
    return <><Header isHelloPage /><HelloPage /></>;
  }

  return <><Header /><main><Hero /><About /><Skills /><Projects /><Contact /></main>
    <footer className="footer"><a className="brand" href="#home">LP<span>.</span></a><p>Designed & built by Lakshan Perera</p><span>© {new Date().getFullYear()}</span></footer>
  </>;
}