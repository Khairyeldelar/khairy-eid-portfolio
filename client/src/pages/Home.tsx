/**
 * Style reminder: Coastal Calm / Swiss editorial. Keep content-led spacing, horizontal horizon lines,
 * #F9E8A2 paper yellow, #A6DCE5 mist aqua, #A1C5DE powder blue, #79A5C8 coastal blue,
 * dark navy text, restrained motion, and avoid card-heavy or neon patterns.
 */
import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  FileText,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Play,
  Search,
  Send,
  Sparkles,
  Sun,
  X,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";

const assets = {
  hero: "/manus-storage/khairy-hero_1c59a548.jpg",
  ai: "/manus-storage/project-ai_f334f218.jpg",
  brand: "/manus-storage/project-brand_09cce7a9.jpg",
  content: "/manus-storage/project-content_cc8694f5.jpg",
  mark: "/manus-storage/ke-mark_ef3b5166.png",
};

type Lang = "ar" | "en";
const copy = {
  ar: {
    nav: ["الرئيسية", "عني", "الأعمال", "الإنجازات", "الشروحات", "المدونة", "تواصل"],
    heroKicker: "Portfolio شخصي · محتوى رقمي · تقنية",
    heroTitle: "أصنع وضوحًا\nللأفكار الرقمية.",
    heroDesc: "أنا خيري عيد علي — صانع محتوى ومصمم مهتم بالتقنية والذكاء الاصطناعي. أعمل على تحويل الأفكار المعقدة إلى تجارب مفهومة، مفيدة، وقابلة للاستخدام.",
    primary: "استكشف أعمالي",
    secondary: "تعرف عليّ",
    introTitle: "أعمل عند تقاطع المحتوى، التصميم، والتقنية.",
    introDesc: "هذا المكان يجمع المشاريع التي صنعتها، الأفكار التي أطورها، والشروحات التي أكتبها لأشارك ما أتعلمه بطريقة عملية وهادئة.",
    selected: "أعمال مختارة",
    selectedSub: "مشاريع تحكي عن طريقة التفكير قبل أن تحكي عن النتيجة.",
    all: "الكل",
    about: "عنّي",
    aboutTitle: "أحب أن أجد الشكل الصحيح للفكرة.",
    aboutDesc: "أعمل على بناء حضور رقمي واضح للأشخاص والمشاريع. من استراتيجية المحتوى إلى تصميم الواجهة، أبحث دائمًا عن نقطة التوازن بين الجمال وسهولة الاستخدام.",
    skills: "مجالات أعمل بها",
    achievements: "محطات وإنجازات",
    tutorials: "شروحات مختارة",
    blog: "من المدونة",
    contact: "لنتحدث عن الفكرة القادمة.",
    contactSub: "سواء كانت بداية مشروع، تعاونًا إبداعيًا، أو سؤالًا تقنيًا — أرسل رسالة قصيرة وسأعود إليك.",
    send: "إرسال الرسالة",
    name: "الاسم", email: "البريد الإلكتروني", subject: "الموضوع", message: "رسالتك",
    footer: "أبني بهدوء. أشارك بوضوح.",
  },
  en: {
    nav: ["Home", "About", "Work", "Milestones", "Tutorials", "Journal", "Contact"],
    heroKicker: "Personal portfolio · Digital content · Technology",
    heroTitle: "I make digital\nideas feel clear.",
    heroDesc: "I’m Khairy Eid Ali — a content creator and designer interested in technology and AI. I turn complex ideas into experiences that feel useful, considered, and easy to use.",
    primary: "Explore selected work",
    secondary: "A little about me",
    introTitle: "Working at the intersection of content, design, and technology.",
    introDesc: "A living collection of projects I’ve shaped, ideas I’m exploring, and practical notes I write to share what I learn.",
    selected: "Selected work",
    selectedSub: "Projects that show the thinking behind the outcome.",
    all: "All",
    about: "About me",
    aboutTitle: "I like finding the right shape for an idea.",
    aboutDesc: "I help people and digital projects build a clearer presence. From content strategy to interface design, I look for the balance between beauty and ease.",
    skills: "Areas I work in",
    achievements: "Milestones",
    tutorials: "Selected tutorials",
    blog: "From the journal",
    contact: "Let’s talk about the next idea.",
    contactSub: "A new project, a creative collaboration, or a technical question — send a note and I’ll get back to you.",
    send: "Send message",
    name: "Name", email: "Email", subject: "Subject", message: "Your message",
    footer: "Building quietly. Sharing clearly.",
  },
};

const projects = [
  { title: "AI, in plain language", category: "ai", ar: "الذكاء الاصطناعي", en: "AI", descAr: "نظام محتوى يشرح أدوات الذكاء الاصطناعي بلغة عملية.", descEn: "A content system that explains AI tools in practical language.", image: assets.ai, year: "2024", tools: "Research · Content map" },
  { title: "A softer brand system", category: "design", ar: "تصميم", en: "Design", descAr: "هوية بصرية لمشروع رقمي يريد أن يبدو إنسانيًا وواضحًا.", descEn: "A visual identity for a digital project that wanted to feel human and clear.", image: assets.brand, year: "2024", tools: "Identity · Interface" },
  { title: "The content studio", category: "content", ar: "محتوى", en: "Content", descAr: "منهج عمل لتخطيط المحتوى وإنتاجه ونشره باستمرار.", descEn: "A working method for planning, producing, and publishing consistently.", image: assets.content, year: "2023", tools: "Workflow · Editorial" },
];
const tutorials = [
  { no: "01", titleAr: "كيف تبدأ نظامًا عمليًا لصناعة المحتوى؟", titleEn: "How to build a practical content system", metaAr: "8 دقائق قراءة · محتوى", metaEn: "8 min read · Content" },
  { no: "02", titleAr: "دليل مبسط لفهم نماذج الذكاء الاصطناعي", titleEn: "A simple guide to understanding AI models", metaAr: "12 دقيقة قراءة · AI", metaEn: "12 min read · AI" },
  { no: "03", titleAr: "لماذا تحتاج المشاريع الصغيرة إلى لغة بصرية؟", titleEn: "Why small projects need a visual language", metaAr: "6 دقائق قراءة · تصميم", metaEn: "6 min read · Design" },
];

function SectionHeading({ number, title, sub, rtl }: { number: string; title: string; sub: string; rtl: boolean }) {
  return <div className="section-heading"><div className="eyebrow"><span>{number}</span><i /></div><div><h2>{title}</h2><p>{sub}</p></div></div>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ar");
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const t = copy[lang];
  const rtl = lang === "ar";
  const filtered = useMemo(() => projects.filter((p) => (filter === "all" || p.category === filter) && (p.title.toLowerCase().includes(search.toLowerCase()) || p.descAr.includes(search) || p.descEn.toLowerCase().includes(search.toLowerCase()))), [filter, search]);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false); };
  const submit = (e: React.FormEvent) => { e.preventDefault(); toast.success(rtl ? "تم تجهيز رسالتك — شكرًا لتواصلك." : "Your note is ready — thank you for reaching out."); };

  return <div className={dark ? "site dark-mode" : "site"} dir={rtl ? "rtl" : "ltr"}>
    <header className="nav-wrap"><nav className="nav container">
      <button className="brand" onClick={() => go("home")} aria-label="Khairy Eid Ali home"><img src={assets.mark} alt="K E mark" /><span>Khairy Eid <b>Ali</b></span></button>
      <div className={menu ? "nav-links open" : "nav-links"}>{t.nav.map((item, i) => <button key={item} onClick={() => go(["home", "about", "work", "milestones", "tutorials", "journal", "contact"][i])}>{item}</button>)}</div>
      <div className="nav-actions"><button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={17} /> : <Moon size={17} />}</button><button className="lang" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>{lang === "ar" ? "EN" : "ع"}</button><button className="menu-btn icon-btn" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X size={20} /> : <Menu size={20} />}</button></div>
    </nav></header>

    <main>
      <section id="home" className="hero container"><div className="hero-copy"><p className="kicker"><span className="dot" />{t.heroKicker}</p><h1>{t.heroTitle.split("\n").map((x, i) => <span key={x} className={i === 1 ? "accent-line" : ""}>{x}<br /></span>)}</h1><p className="hero-desc">{t.heroDesc}</p><div className="hero-actions"><button className="btn primary" onClick={() => go("work")}>{t.primary}<ArrowUpRight size={17} /></button><button className="text-link" onClick={() => go("about")}>{t.secondary}<ArrowDownLeft size={16} /></button></div><div className="social-row"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a><a href="https://www.youtube.com" target="_blank" rel="noreferrer"><Youtube size={16} /> YouTube</a></div></div><div className="hero-art"><img src={assets.hero} alt="Abstract coastal horizon in the portfolio palette" /><div className="hero-stamp"><img src={assets.mark} alt="Khairy Eid Ali mark" /><small>CONTENT<br />DESIGN<br />TECH</small></div><div className="hero-caption">{rtl ? "فكرة · شكل · أثر" : "Idea · Form · Impact"}</div></div></section>

      <section className="intro container"><div className="intro-rule" /><div className="intro-grid"><img className="editorial-mark" src={assets.mark} alt="" aria-hidden="true" /><div><p className="kicker">{rtl ? "نبذة سريعة" : "A quick note"}</p><h2>{t.introTitle}</h2></div><p>{t.introDesc}</p></div></section>

      <section id="work" className="section container"><SectionHeading number="01" title={t.selected} sub={t.selectedSub} rtl={rtl} /><div className="work-toolbar"><div className="filters">{[["all", t.all], ["ai", rtl ? "ذكاء اصطناعي" : "AI"], ["design", rtl ? "تصميم" : "Design"], ["content", rtl ? "محتوى" : "Content"]].map(([id, label]) => <button className={filter === id ? "active" : ""} key={id} onClick={() => setFilter(id)}>{label}</button>)}</div><label className="search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={rtl ? "ابحث في الأعمال" : "Search work"} /></label></div><div className="projects">{filtered.map((p, i) => <article className={i === 0 ? "project featured" : "project"} key={p.title}><div className="project-image"><img src={p.image} loading="lazy" alt={p.title} /><span>{p.year}</span></div><div className="project-info"><div><p className="project-cat">{rtl ? p.ar : p.en}</p><h3>{p.title}</h3><p>{rtl ? p.descAr : p.descEn}</p><span className="project-tools">{p.tools}</span></div><button className="circle-arrow" aria-label={rtl ? "عرض التفاصيل" : "View details"} onClick={() => toast.info(rtl ? "تفاصيل المشروع ستكون متاحة قريبًا." : "Project details are coming soon.")}><ArrowUpRight size={19} /></button></div></article>)}</div></section>

      <section id="about" className="about-band"><div className="container about-grid"><div className="about-aside"><p className="kicker">{t.about}</p><div className="big-number">02</div><div className="mini-rule" /></div><div className="about-content"><h2>{t.aboutTitle}</h2><p className="lead">{t.aboutDesc}</p><div className="skill-list"><h3>{t.skills}</h3><div className="skill-tags">{[rtl ? "استراتيجية المحتوى" : "Content strategy", rtl ? "تصميم واجهات" : "Interface design", rtl ? "الذكاء الاصطناعي" : "Artificial intelligence", rtl ? "الهوية البصرية" : "Visual identity", rtl ? "كتابة تقنية" : "Technical writing", rtl ? "إدارة المشاريع" : "Project direction"].map(s => <span key={s}>{s}</span>)}</div></div><div className="about-facts"><div><strong>04+</strong><span>{rtl ? "سنوات من التجربة" : "years of practice"}</span></div><div><strong>∞</strong><span>{rtl ? "فضول مستمر" : "curiosity, always"}</span></div><div><strong>01</strong><span>{rtl ? "طريقة عمل واضحة" : "clear way of working"}</span></div></div></div></div></section>

      <section id="milestones" className="section container"><SectionHeading number="03" title={t.achievements} sub={rtl ? "خطوات صغيرة صنعت فرقًا واضحًا." : "Small steps that made a visible difference."} rtl={rtl} /><div className="timeline"><div className="timeline-line" />{[["2024", rtl ? "إطلاق مساحة المحتوى الرقمي" : "Launched a digital content space", rtl ? "بناء نظام يجمع بين التعلّم والمشاركة العملية." : "Built a space for learning and practical sharing."], ["2023", rtl ? "توسيع العمل في مشاريع الذكاء الاصطناعي" : "Expanded into AI projects", rtl ? "تجارب أولى في تبسيط الأدوات والأفكار التقنية." : "Early experiments in making technical tools feel accessible."], ["2022", rtl ? "بداية الرحلة المستقلة" : "Started the independent journey", rtl ? "من التصميم إلى المحتوى، مع تركيز على الأثر الحقيقي." : "From design to content, with a focus on useful outcomes."]].map(([year, title, desc]) => <div className="milestone" key={year}><span className="year">{year}</span><div className="milestone-dot" /><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div></section>

      <section id="tutorials" className="paper-section"><div className="container"><SectionHeading number="04" title={t.tutorials} sub={rtl ? "أفكار قابلة للتطبيق، بعيدًا عن التعقيد." : "Practical ideas, without the noise."} rtl={rtl} /><div className="tutorial-list">{tutorials.map(x => <article key={x.no} className="tutorial"><span>{x.no}</span><div><h3>{rtl ? x.titleAr : x.titleEn}</h3><p>{rtl ? x.metaAr : x.metaEn}</p></div><button onClick={() => toast.info(rtl ? "سيتم نشر الشرح قريبًا." : "This tutorial will be published soon.")}><BookOpen size={18} /></button></article>)}</div></div></section>

      <section id="journal" className="section container journal"><SectionHeading number="05" title={t.blog} sub={rtl ? "ملاحظات عن العمل والتعلّم وصناعة الأشياء الرقمية." : "Notes on working, learning, and making digital things."} rtl={rtl} /><div className="journal-grid"><article className="journal-feature"><div className="journal-icon"><FileText size={22} /></div><p className="project-cat">{rtl ? "مقالة · 2024" : "Essay · 2024"}</p><h3>{rtl ? "التصميم ليس مظهرًا فقط، بل طريقة تفكير." : "Design is not just a look. It is a way of thinking."}</h3><p>{rtl ? "ملاحظات قصيرة عن القرارات التي تجعل المنتج أوضح وأسهل." : "Short notes on the decisions that make a product clearer and easier."}</p><button className="text-link" onClick={() => toast.info(rtl ? "المقالة قيد الإعداد." : "The article is being prepared.")}>{rtl ? "اقرأ المقالة" : "Read article"} <ArrowUpRight size={16} /></button></article><div className="journal-side"><div><Sparkles size={18} /><h3>{rtl ? "أفكار جديدة كل فترة" : "Fresh notes, occasionally"}</h3><p>{rtl ? "اشترك لاحقًا لتصلك أحدث الشروحات والمقالات." : "Subscribe later for new tutorials and essays."}</p></div><label className="newsletter"><input placeholder={rtl ? "بريدك الإلكتروني" : "Your email address"} /><button aria-label="Subscribe" onClick={() => toast.success(rtl ? "شكرًا — سنبقى على تواصل." : "Thank you — we’ll stay in touch.")}><Send size={16} /></button></label></div></div></section>

      <section id="contact" className="contact-band"><div className="container contact-grid"><div><p className="kicker">06 — {rtl ? "تواصل" : "Contact"}</p><h2>{t.contact}</h2><p>{t.contactSub}</p><div className="contact-details"><a href="mailto:hello@khairyali.com"><Mail size={17} /> hello@khairyali.com</a><span><Globe2 size={17} /> Cairo · Remote</span></div></div><form onSubmit={submit}><label>{t.name}<input required placeholder={rtl ? "اكتب اسمك" : "Your name"} /></label><label>{t.email}<input required type="email" placeholder={rtl ? "name@example.com" : "name@example.com"} /></label><label>{t.subject}<input required placeholder={rtl ? "كيف يمكنني مساعدتك؟" : "How can I help?"} /></label><label>{t.message}<textarea required rows={4} placeholder={rtl ? "اكتب رسالتك هنا..." : "Write your message here..."} /></label><button className="btn dark-btn" type="submit">{t.send}<ArrowUpRight size={17} /></button></form></div></section>
    </main>

    <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><button className="brand" onClick={() => go("home")}><img src={assets.mark} alt="K E mark" /><span>Khairy Eid <b>Ali</b></span></button><p>{t.footer}</p></div><div className="footer-links">{t.nav.slice(0, 5).map((x, i) => <button key={x} onClick={() => go(["home", "about", "work", "milestones", "tutorials"][i])}>{x}</button>)}</div><div className="footer-meta"><span>© 2024 Khairy Eid Ali</span><span>{rtl ? "صُنع بعناية" : "Made with care"}</span></div></div></footer>
  </div>;
}
