import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BatteryCharging,
  Building2,
  Check,
  ChevronRight,
  CircuitBoard,
  Clock3,
  Gauge,
  HousePlug,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import buildersAsset from "@/assets/builders-at-work-1920w.jpg.asset.json";
import cmeqAsset from "@/assets/cmeq-logo-640w-smaller.png.asset.json";
import repairAsset from "@/assets/electrician-working-house-repair-1920w.jpg.asset.json";
import installAsset from "@/assets/electrician-working-house-repair-installation-1920w.jpg.asset.json";
import truckAsset from "@/assets/frank-mastro-eletricien-company-truck-1920w.jpg.asset.json";
import posterAsset from "@/assets/hero-poster-cropped.jpg";
import introLogoAsset from "@/assets/logo.png.asset.json";
import headerLogoAsset from "@/assets/logo_header-2.png.asset.json";
import videoAsset from "@/assets/hero-video-cropped.mp4.asset.json";

const title = "Frank Mastro l’Électricien | Montréal et Rive-Sud";
const description =
  "Maître électricien à Montréal et sur la Rive-Sud : services résidentiels et commerciaux, urgences 24/7 et soumissions gratuites.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Electrician",
          name: "Frank Mastro l’Électricien",
          description,
          telephone: ["+1-514-497-2126", "+1-514-497-2096"],
          email: "frank.mastro@bell.net",
          address: {
            "@type": "PostalAddress",
            streetAddress: "3415 boul. Béliveau",
            addressLocality: "Saint-Hubert",
            addressRegion: "QC",
            postalCode: "J3Y 0E3",
            addressCountry: "CA",
          },
          areaServed: ["Montréal", "Rive-Sud", "Saint-Hubert", "Brossard", "Saint-Bruno-de-Montarville"],
          openingHours: "Mo-Fr 07:00-19:00",
          priceRange: "$$",
        }),
      },
    ],
  }),
  component: SitePage,
});

const services = [
  { icon: Gauge, title: "Analyse et réparations", text: "Diagnostic méthodique, recherche de panne et correction durable de vos problèmes électriques." },
  { icon: HousePlug, title: "Installations électriques", text: "Panneaux, prises, éclairage et circuits installés selon les normes en vigueur." },
  { icon: CircuitBoard, title: "Entretien électrique", text: "Inspection préventive et entretien planifié pour réduire les pannes et les risques." },
  { icon: Sparkles, title: "Planchers radiants", text: "Confort uniforme, contrôle précis et installation soignée pour chaque pièce." },
  { icon: BatteryCharging, title: "Borne électrique pour auto", text: "Installation résidentielle ou commerciale adaptée à votre véhicule et à votre panneau." },
  { icon: Zap, title: "Installation de génératrice", text: "Alimentation de secours fiable et sécuritaire pour rester prêt en toute saison." },
];

const steps = [
  "Prise de contact & analyse rapide des besoins",
  "Diagnostic précis et soumission transparente",
  "Planification rapide et sécuritaire",
  "Exécution rigoureuse par des maîtres électriciens certifiés",
  "Contrôle de conformité et garantie de satisfaction",
];

const municipalities = [
  "Sainte-Julie", "Saint-Bruno-de-Montarville", "Longueuil", "Saint-Hubert", "Saint-Jean-sur-Richelieu",
  "Carignan", "Chambly", "Boucherville", "Beloeil", "La Prairie", "Varennes", "Saint-Constant",
  "Châteauguay", "Beauharnois", "Secteurs environnants",
];

const spotlights: Array<[string, string, LucideIcon]> = [
  ["Saint-Bruno", "Résidentiel et commercial", HousePlug],
  ["Candiac", "Interventions rapides", Gauge],
  ["Brossard", "Projets et dépannages", Building2],
  ["Préparation hivernale", "Génératrices et inspections", Snowflake],
];

function ElectricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width;
      pointerY = (event.clientY - bounds.top) / bounds.height;
    };
    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(72, 121, 255, .28)";
      context.lineWidth = 1;
      for (let x = 18; x < width; x += 42) {
        context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
      }
      for (let y = 18; y < height; y += 42) {
        context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
      }
      const phase = reduced ? 0.5 : (time / 1400) % 1;
      const points: Array<[number, number]> = [
        [0, height * 0.72], [width * 0.16, height * 0.72], [width * 0.16, height * 0.32],
        [width * 0.43, height * 0.32], [width * 0.43, height * 0.6], [width * 0.72, height * 0.6],
        [width * 0.72, height * 0.22], [width, height * 0.22],
      ];
      context.beginPath();
      points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
      context.strokeStyle = "rgba(88, 157, 255, .7)";
      context.lineWidth = 3;
      context.shadowColor = "rgba(68, 136, 255, .9)";
      context.shadowBlur = 14;
      context.stroke();
      context.shadowBlur = 25;
      context.fillStyle = "rgba(255,255,255,.95)";
      context.beginPath();
      context.arc(width * phase + (pointerX - 0.5) * 12, height * (0.5 + (pointerY - 0.5) * 0.18), 4, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={canvasRef} className="electric-canvas" aria-hidden="true" />;
}

function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 100 : 2000);
    return () => window.clearTimeout(timer);
  }, [onDone]);
  return (
    <div className="intro-screen" aria-label="Frank Mastro l’Électricien">
      <div className="intro-bolt intro-bolt-one" />
      <div className="intro-bolt intro-bolt-two" />
      <img src={introLogoAsset.url} alt="Frank Mastro l’Électricien" className="intro-logo" />
      <span className="intro-line" />
    </div>
  );
}

function QuoteForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <form className="quote-form" onSubmit={submit} aria-label="Demande de soumission gratuite">
      <div className="form-heading">
        <span className="eyebrow eyebrow-blue">Réponse rapide</span>
        <h2>Demandez une soumission gratuite</h2>
        <p>Expliquez-nous votre besoin. Nous vous guiderons vers la bonne solution.</p>
      </div>
      <label>Service recherché
        <select name="service" required defaultValue="">
          <option value="" disabled>Choisir un service</option>
          <option>Réparation urgente</option><option>Installation résidentielle</option>
          <option>Travaux commerciaux</option><option>Borne de recharge</option>
          <option>Génératrice</option><option>Autre besoin</option>
        </select>
      </label>
      <div className="form-row">
        <label>Votre nom<input name="nom" autoComplete="name" required placeholder="Nom complet" /></label>
        <label>Téléphone<input name="telephone" type="tel" autoComplete="tel" required placeholder="514 000-0000" /></label>
      </div>
      <label>Courriel<input name="courriel" type="email" autoComplete="email" required placeholder="vous@exemple.ca" /></label>
      <label>Décrivez brièvement les travaux<textarea name="message" rows={3} required placeholder="Type de bâtiment, problème ou projet…" /></label>
      <button className="button button-primary button-full" type="submit"><Zap size={18} /> Obtenir ma soumission</button>
      {sent ? <p className="form-success" role="status"><Check size={18} /> Merci! Pour transmettre immédiatement votre demande, appelez-nous au <a href="tel:+15144972126">514-497-2126</a>.</p> : <p className="form-note"><ShieldCheck size={15} /> Renseignements traités avec discrétion.</p>}
    </form>
  );
}

function SitePage() {
  const [intro, setIntro] = useState(true);
  const [menu, setMenu] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [serviceType, setServiceType] = useState<"residentiel" | "commercial">("residentiel");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [intro]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = Array.from(document.querySelectorAll<HTMLElement>(".parallax-slow, .parallax-medium"));
    let frame = 0;
    const update = () => {
      const viewportMiddle = window.innerHeight / 2;
      layers.forEach((layer) => {
        const bounds = layer.getBoundingClientRect();
        const distance = bounds.top + bounds.height / 2 - viewportMiddle;
        const strength = layer.classList.contains("parallax-medium") ? -0.045 : -0.025;
        layer.style.transform = `translate3d(0, ${distance * strength}px, 0)`;
      });
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [intro]);

  return (
    <>
      {intro && <Intro onDone={() => setIntro(false)} />}
      <div className={intro ? "site-shell site-waiting" : "site-shell site-ready"}>
        <header className="site-header">
          <a href="#accueil" className="brand" aria-label="Frank Mastro l’Électricien — Accueil"><img src={headerLogoAsset.url} alt="Frank Mastro l’Électricien" /></a>
          <nav className={menu ? "nav-links nav-open" : "nav-links"} aria-label="Navigation principale">
            <a href="#services" onClick={() => setMenu(false)}>Services</a>
            <a href="#processus" onClick={() => setMenu(false)}>Notre processus</a>
            <a href="#secteurs" onClick={() => setMenu(false)}>Secteurs desservis</a>
            <a href="#avis" onClick={() => setMenu(false)}>Avis</a>
          </nav>
          <div className="header-actions">
            <a className="emergency-link" href="tel:+15144972096"><span>Urgences 24/7</span><strong>514-497-2096</strong></a>
            <a className="button button-primary header-call" href="tel:+15144972126"><Phone size={17} /> Appeler</a>
            <button className="menu-button" aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
          </div>
        </header>

        <main>
          <section className="hero" id="accueil">
            <video className="hero-video" autoPlay muted loop playsInline poster={posterAsset.url} aria-label="Électricien Frank Mastro au travail">
              <source src={videoAsset.url} type="video/mp4" />
            </video>
            <div className="hero-overlay" />
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="hero-kicker"><span className="live-dot" /> Maître électricien • Montréal & Rive-Sud</div>
                <h1>SERVICES ÉLECTRIQUES <span>RAPIDES ET EFFICACES</span> à Montréal et en Rive-Sud</h1>
                <p>Frank Mastro l'Électricien est l'une des entreprises les plus fiables de Montréal pour tout ce qui concerne l'électricité. Que vous cherchiez un électricien résidentiel ou un électricien commercial, faites-nous confiance.</p>
                <div className="hero-actions">
                  <a className="button button-primary" href="tel:+15144972096"><Phone size={18} /> Urgence : 514-497-2096</a>
                  <a className="text-link" href="#services">Voir nos services <ArrowRight size={18} /></a>
                </div>
                <div className="hero-trust"><ShieldCheck size={20} /><span><strong>Travaux conformes et sécuritaires</strong><small>Maître électricien membre de la CMEQ</small></span></div>
              </div>
            </div>
            <a className="scroll-cue" href="#confiance"><span /> Découvrir</a>
          </section>

          <section className="trust-strip" id="confiance">
            <div className="trust-item"><Award /><div><strong>Maître électricien</strong><span>Certification CMEQ</span></div></div>
            <div className="trust-item"><Clock3 /><div><strong>Urgences 24/7</strong><span>Intervention rapide</span></div></div>
            <div className="trust-item"><ShieldCheck /><div><strong>Conformité garantie</strong><span>Travaux rigoureux</span></div></div>
            <img src={cmeqAsset.url} alt="Corporation des maîtres électriciens du Québec" />
          </section>

          <section className="section services-section" id="services">
            <div className="section-heading reveal">
              <span className="eyebrow">Savoir-faire complet</span>
              <h2>Une expertise électrique <span>pour chaque besoin</span></h2>
              <p>Des interventions précises, pensées pour la sécurité, la performance et la tranquillité d’esprit.</p>
            </div>
            <div className="service-switch reveal" role="tablist" aria-label="Type de services">
              <button role="tab" aria-selected={serviceType === "residentiel"} onClick={() => setServiceType("residentiel")}><HousePlug size={19} /> Services résidentiels</button>
              <button role="tab" aria-selected={serviceType === "commercial"} onClick={() => setServiceType("commercial")}><Building2 size={19} /> Services commerciaux</button>
            </div>
            <div className="service-layout">
              <div className="services-grid">
                {services.map((service, index) => (
                  <article className="service-card reveal" key={service.title} style={{ transitionDelay: `${index * 55}ms` }}>
                    <div className="service-icon"><service.icon /></div>
                    <span className="service-number">0{index + 1}</span>
                    <h3>{service.title}</h3><p>{service.text}</p>
                    <a href="#soumission">Parler de mon projet <ChevronRight size={16} /></a>
                  </article>
                ))}
              </div>
              <aside className="circuit-panel reveal">
                <ElectricCanvas />
                <div className="circuit-copy">
                  <Zap />
                  <span>{serviceType === "residentiel" ? "Votre maison, alimentée en toute confiance." : "Votre entreprise, toujours sous tension."}</span>
                  <small>Déplacez le pointeur pour suivre le courant.</small>
                </div>
              </aside>
            </div>
          </section>

          <section className="image-band">
            <div className="image-band-photo parallax-slow" style={{ backgroundImage: `url(${repairAsset.url})` }} />
            <div className="image-band-content reveal">
              <span className="eyebrow eyebrow-light">Prévenir plutôt que réparer</span>
              <h2>BIENVENUE AU RÉSEAU D’ÉLECTRICIENS!</h2>
              <p>Un réseau électrique fiable commence par une inspection attentive. Certains signes ne doivent jamais être ignorés.</p>
              <ul className="risk-list">
                {["Fils vieux et défectueux", "Mauvais usage de fils d'extension", "Usage excessif d'électricité", "Court-circuit et entretien médiocre"].map((risk) => <li key={risk}><Zap size={17} /> {risk}</li>)}
              </ul>
              <a className="button button-light" href="tel:+15144972126">Faire vérifier mon installation <ArrowRight size={18} /></a>
            </div>
          </section>

          <section className="section process-section" id="processus">
            <div className="process-intro reveal">
              <span className="eyebrow">Simple. Clair. Sécuritaire.</span>
              <h2>Le processus en 5 étapes de Frank Mastro</h2>
              <p>De votre premier appel jusqu’au contrôle final, chaque intervention suit une méthode éprouvée.</p>
              <img src={installAsset.url} alt="Électricien préparant un câble pour une installation" loading="lazy" />
            </div>
            <ol className="steps-list">
              {steps.map((step, index) => <li className="reveal" key={step}><span>{index + 1}</span><div><small>Étape {index + 1}</small><h3>{step}</h3></div><Check /></li>)}
            </ol>
          </section>

          <section className="advantages-section">
            <div className="advantages-photo parallax-medium"><img src={buildersAsset.url} alt="Maîtres électriciens effectuant une installation" loading="lazy" /></div>
            <div className="advantages-content reveal">
              <span className="eyebrow eyebrow-light">Pourquoi Frank Mastro?</span>
              <h2>Une qualité de travail qui ne laisse rien au hasard.</h2>
              <div className="advantages-list">
                {["Sécurité garantie — Maître électricien CMEQ", "Expérience étendue", "Tarifs compétitifs", "Solutions personnalisées", "Expertise en résolution de problèmes"].map((item) => <div key={item}><ShieldCheck /><span>{item}</span></div>)}
              </div>
              <div className="warranty"><strong>100%</strong><span>Conformité et satisfaction au cœur de chaque intervention.</span></div>
            </div>
          </section>

          <section className="section areas-section" id="secteurs">
            <div className="section-heading reveal"><span className="eyebrow">À votre service, près de chez vous</span><h2>Montréal, Rive-Sud et <span>municipalités voisines</span></h2></div>
            <div className="spotlight-grid">
              {spotlights.map(([place, text, Icon]) => <article className="spotlight-card reveal" key={place}><Icon /><span>{text}</span><h3>{place}</h3></article>)}
            </div>
            <div className="municipality-grid reveal">{municipalities.map((place) => <span key={place}><MapPin size={15} /> {place}</span>)}</div>
          </section>

          <section className="truck-section">
            <img src={truckAsset.url} alt="Camion nacelle de Frank Mastro l’Électricien" loading="lazy" />
            <div className="truck-copy reveal"><span className="eyebrow eyebrow-light">Équipés pour intervenir</span><h2>Du panneau électrique aux travaux en hauteur.</h2><p>Un service local, une équipe expérimentée et l’équipement nécessaire pour réaliser vos travaux efficacement.</p><a className="button button-light" href="#soumission">Planifier une intervention <ArrowRight size={18} /></a></div>
          </section>

          <section className="section reviews-section" id="avis">
            <div className="section-heading reveal"><span className="eyebrow">La confiance de nos clients</span><h2>Un travail propre. <span>Un résultat impeccable.</span></h2></div>
            <div className="reviews-grid">
              <blockquote className="review-card reveal"><div className="stars" aria-label="5 étoiles">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</div><p>« Je recommande fortement les services de Frank Mastro l'Électricien sur la Rive-Sud, pour une installation impeccable. »</p><footer><strong>Patrick T.</strong><span>Client résidentiel</span></footer></blockquote>
              <blockquote className="review-card review-featured reveal"><div className="stars" aria-label="5 étoiles">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</div><p>« Un électricien très propre, professionnel. L'ouvrage était très bien fait. »</p><footer><strong>Sylvain B.</strong><span>Client résidentiel</span></footer></blockquote>
              <blockquote className="review-card rating-card reveal"><div className="rating-number">5,0</div><div className="stars" aria-label="5 étoiles">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</div><p>Une cote parfaite qui témoigne d’un service professionnel, soigné et fiable.</p><footer><strong>Clients satisfaits</strong><span>Montréal et Rive-Sud</span></footer></blockquote>
            </div>
          </section>

          <section className="final-cta" id="soumission">
            <div className="final-cta-details">
              <div className="final-cta-copy reveal"><span className="eyebrow eyebrow-light">Votre projet commence ici</span><h2>Besoin d’un maître électricien fiable?</h2><p>Parlez directement à Frank Mastro pour une intervention rapide ou une soumission claire.</p><div><a className="button button-light" href="tel:+15144972126"><Phone size={18} /> 514-497-2126</a><a className="button button-outline-light" href="mailto:frank.mastro@bell.net"><Mail size={18} /> Écrire un courriel</a></div></div>
              <div className="emergency-card reveal"><span>Urgences électriques</span><strong>Disponible 24 h / 24, 7 j / 7</strong><a href="tel:+15144972096">514-497-2096 <ArrowRight /></a></div>
            </div>
            <div className="final-quote reveal"><QuoteForm /></div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-main">
            <div className="footer-brand"><img src={introLogoAsset.url} alt="Frank Mastro l’Électricien" /><p>Maître électricien au service de Montréal et de la Rive-Sud.</p><img className="footer-cmeq" src={cmeqAsset.url} alt="Membre de la CMEQ" /></div>
            <div><h3>Coordonnées</h3><a href="https://maps.google.com/?q=3415+boul.+Béliveau+Saint-Hubert+QC+J3Y+0E3"><MapPin />3415 boul. Béliveau<br />Saint-Hubert, QC, J3Y 0E3</a><a href="mailto:frank.mastro@bell.net"><Mail />frank.mastro@bell.net</a></div>
            <div><h3>Téléphone</h3><a href="tel:+15144972126"><Phone />514-497-2126 <small>Bureau</small></a><a href="tel:+15144972096"><Zap />514-497-2096 <small>Urgences</small></a></div>
            <div><h3>Heures d’ouverture</h3><p><Clock3 />Lundi au vendredi<br /><strong>7 h à 19 h</strong></p><p><ShieldCheck />Fin de semaine<br /><strong>Urgences 24/7</strong></p></div>
          </div>
          <div className="footer-bottom"><span>© 2026 Frank Mastro l’Électricien. Tous droits réservés.</span><button onClick={() => setPrivacy(true)}>Politique de confidentialité</button></div>
        </footer>

        <a className="mobile-emergency" href="tel:+15144972096"><Zap size={18} /><span>Urgence 24/7</span><strong>514-497-2096</strong></a>
      </div>

      {privacy && <div className="modal-backdrop" role="presentation" onMouseDown={() => setPrivacy(false)}><section className="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setPrivacy(false)} aria-label="Fermer"><X /></button><span className="eyebrow">Vos renseignements</span><h2 id="privacy-title">Politique de confidentialité</h2><p>Frank Mastro l’Électricien respecte la confidentialité des renseignements que vous communiquez lors d’une demande de soumission.</p><h3>Renseignements recueillis</h3><p>Le nom, le numéro de téléphone, l’adresse courriel et les détails du projet servent uniquement à répondre à votre demande et à planifier les travaux.</p><h3>Utilisation et conservation</h3><p>Vos renseignements ne sont ni vendus ni transmis à des tiers, sauf lorsque la loi l’exige. Ils sont conservés seulement pour la durée nécessaire au suivi de votre demande.</p><h3>Nous joindre</h3><p>Pour toute question, écrivez à <a href="mailto:frank.mastro@bell.net">frank.mastro@bell.net</a> ou appelez au <a href="tel:+15144972126">514-497-2126</a>.</p><button className="button button-primary" onClick={() => setPrivacy(false)}>J’ai compris</button></section></div>}
    </>
  );
}