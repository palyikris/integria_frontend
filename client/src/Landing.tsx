import React, { useState, useEffect, useRef } from "react";

export default function Landing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("features");
  const revealRefs = useRef([]);

  // Handle Navbar styling on scroll and active section
  useEffect(() => {
    const sectionIds = ["features", "about", "pricing", "testimonials"];
    const sectionElements = sectionIds.map((id) => document.getElementById(id));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Find the section closest to the top
      const scrollPosition = window.scrollY + 120; // Offset for navbar
      let current = sectionIds[0];
      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i];
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = sectionIds[i];
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Premium Scroll Reveal Effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-[30px]");
        }
      });
    }, observerOptions);

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  // Toggle pricing with cross-fade animation
  const handleBillingToggle = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsAnnual(!isAnnual);
      setIsUpdating(false);
    }, 150);
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-[#006c4a]/30 scroll-smooth min-h-screen">
      {/* Dynamic Embedded Styles for Complex Micro-interactions */}
      <style>{`
        :root {
          --premium-ease: cubic-bezier(0.65, 0, 0.35, 1);
        }
        .premium-transition {
          transition: all 0.4s var(--premium-ease);
        }
        .glow-on-hover {
          transition: all 0.3s var(--premium-ease);
        }
        .glow-on-hover:hover { 
          box-shadow: 0 0 20px rgba(0, 108, 74, 0.3);
          transform: scale(1.02);
        }

        .feature-card-glow {
          position: relative;
          overflow: visible;
        }
        .feature-card-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          pointer-events: none;
          z-index: 1;
          transition: box-shadow 0.6s var(--premium-ease);
        }
        .feature-card-glow:hover::before {
          box-shadow: 0 0 0 3px #006c4a, 0 2px 16px 0 rgba(0,108,74,0.10) inset;
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker-scroll 40s linear infinite;
        }
      `}</style>

      {/* TopNavBar */}
      <nav
        className={`fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-xl border-b border-[#c6c6cd]/30 shadow-sm transition-all duration-300 ease-in-out ${isScrolled ? "h-16" : "h-20"}`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center h-full">
          <div className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#000000] tracking-tight">
            Integria
          </div>
          <div className="hidden md:flex items-center gap-8 font-['Inter'] text-sm font-semibold text-[#45464d]">
            <a
              className={
                `transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full ` +
                (activeSection === "features"
                  ? "text-[#000000] after:bg-[#006c4a] after:content-['']"
                  : "hover:text-[#000000] after:bg-transparent after:content-['']")
              }
              href="#features"
            >
              Funkciók
            </a>
            <a
              className={
                `transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full ` +
                (activeSection === "about"
                  ? "text-[#000000] after:bg-[#006c4a] after:content-['']"
                  : "hover:text-[#000000] after:bg-transparent after:content-['']")
              }
              href="#about"
            >
              Rólunk
            </a>
            <a
              className={
                `transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full ` +
                (activeSection === "pricing"
                  ? "text-[#000000] after:bg-[#006c4a] after:content-['']"
                  : "hover:text-[#000000] after:bg-transparent after:content-['']")
              }
              href="#pricing"
            >
              Árazás
            </a>
            <a
              className={
                `transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full ` +
                (activeSection === "testimonials"
                  ? "text-[#000000] after:bg-[#006c4a] after:content-['']"
                  : "hover:text-[#000000] after:bg-transparent after:content-['']")
              }
              href="#testimonials"
            >
              Vélemények
            </a>
            <a
              className={
                `transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full ` +
                (activeSection === "contact"
                  ? "text-[#000000] after:bg-[#006c4a] after:content-['']"
                  : "hover:text-[#000000] after:bg-transparent after:content-['']")
              }
              href="#contact"
            >
              Kapcsolat
            </a>
          </div>
          <div className="flex items-center gap-4 font-['Inter'] text-sm font-semibold">
            <a
              href="/portal"
              className="bg-[#131b2e] text-white px-6 py-2.5 rounded-lg glow-on-hover text-center"
            >
              Rendszer megnyitása
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-64 pb-16 md:pb-24 px-6 overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={addToRefs}
            className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)]"
          >
            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl md:text-6xl font-extrabold text-[#131b2e] mb-6 leading-[1.1] tracking-[-0.02em]">
              Biztonságos{" "}
              <span className="text-[#006c4a] italic">
                Visszaélés-bejelentés
              </span>{" "}
              Vállalatoknak
            </h1>
            <p className="font-['Inter'] text-lg text-[#45464d] mb-10 max-w-xl leading-relaxed">
              A 2023. évi XXV. törvény (Panasztörvény) szerinti kötelező
              megfelelés teljesen automatizálva. Egyszerű, anonim és
              GDPR-kompatibilis visszaélés-bejelentési rendszer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 font-['Inter'] text-sm font-semibold">
              <a
                href="/portal"
                className="bg-[#131b2e] text-white px-8 py-4 rounded-lg glow-on-hover flex items-center justify-center gap-2"
              >
                Bejelentési rendszer megtekintése
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
              <button className="border border-[#131b2e] text-[#131b2e] px-8 py-4 rounded-lg hover:bg-[#eceef0] premium-transition flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Hogyan Működik?
              </button>
            </div>
          </div>
          <div
            ref={addToRefs}
            className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] relative"
          >
            <div className="absolute inset-0 bg-[#006c4a]/5 rounded-3xl -rotate-2 -z-10"></div>
            <img
              alt="Integria Visszaélés-bejelentés Illusztráció"
              className="rounded-3xl shadow-2xl w-full object-cover aspect-video select-none pointer-events-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1yGRgOpANURMe5lIy-SWqgXIPdX50t8ptKZec-_54MdxQ27kJrr9xxbn1z0aAMIXU-cYNas9UsuMCodW7aOudJANIJ95M1rbAFKQJlIT9UvhsQCc7uG8x2POw_i8qI70V-EccKAgidN69xu5MvaipnsbFmqc7_0icC1SqkpO7W6HqRhsSVO1fRu2hV5xNq3kkv7L9ft4sLAmOJawIux5NE6zB6oaGFKeAfdvCEo2UHjsRDL6ARBkJJWwoZevTs4i2xLMZkLasmQ"
            />
          </div>
        </div>
      </section>

      {/* Partners Ticker */}
      <section className="py-12 bg-[#f2f4f6] overflow-hidden">
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] max-w-[1280px] mx-auto px-6 mb-8 text-center"
        >
          <h2 className="font-['Inter'] text-xs font-bold uppercase tracking-widest text-[#45464d]">
            Partnereink, akik már megbíznak bennünk
          </h2>
        </div>
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] flex whitespace-nowrap overflow-hidden"
        >
          <div className="flex gap-16 items-center animate-ticker pr-16 text-3xl font-bold text-[#76777d]/40 cursor-default font-['Plus_Jakarta_Sans']">
            {["VANGUARD", "ORBITAL", "SYNERGY", "APEX", "MERIDIAN"].map(
              (logo, idx) => (
                <div
                  key={idx}
                  className="transition-all duration-500 hover:text-[#000000] hover:scale-105 filter grayscale hover:grayscale-0"
                >
                  {logo}
                </div>
              ),
            )}
            {["VANGUARD", "ORBITAL", "SYNERGY", "APEX", "MERIDIAN"].map(
              (logo, idx) => (
                <div
                  key={`dup-${idx}`}
                  className="transition-all duration-500 hover:text-[#000000] hover:scale-105 filter grayscale hover:grayscale-0"
                >
                  {logo}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 px-6 bg-[#f7f9fb]" id="about">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div
            ref={addToRefs}
            className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] md:order-2"
          >
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-semibold text-[#000000] mb-6">
              Szakértelem és Jogi Biztonság
            </h2>
            <p className="font-['Inter'] text-base text-[#45464d] mb-6 leading-relaxed">
              Az Integria küldetése, hogy levegye a jogi megfelelés terhét a
              magyar vállalatok válláról. Megoldásunk ötvözi a szigorú
              adatvédelmi szabványokat a végletekig egyszerűsített digitális
              ügyintézéssel.
            </p>
            <p className="font-['Inter'] text-base text-[#45464d] mb-8 leading-relaxed">
              Nem csupán egy szoftvercsatornát biztosítunk, hanem egy olyan
              auditálható, zárt rendszert, amely garantálja mind a bejelentő
              anonimitását, mind a vizsgálóbizottság strukturált, határidőre
              történő munkavégzését.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-xl border border-[#c6c6cd]/50 hover:shadow-md premium-transition">
                <div className="text-3xl font-bold text-[#006c4a] mb-2">
                  100%
                </div>
                <div className="font-['Inter'] text-xs font-medium text-[#45464d]">
                  Panasztörvény megfelelési ráta
                </div>
              </div>
              <div className="p-6 bg-white rounded-xl border border-[#c6c6cd]/50 hover:shadow-md premium-transition">
                <div className="text-3xl font-bold text-[#006c4a] mb-2">
                  GDPR
                </div>
                <div className="font-['Inter'] text-xs font-medium text-[#45464d]">
                  Szigorú EU-s adattitkosítás
                </div>
              </div>
            </div>
          </div>
          <div
            ref={addToRefs}
            className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] md:order-1"
          >
            <div className="aspect-[4/5] relative overflow-hidden rounded-2xl group">
              <img
                alt="Integria Szakértői Csapat"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXi0Ozb-UGt1YMetrIxxHR7Z0BxdiX9wjwNpMA_thuVAEwIwkU7l023LVd4HXCsr4ED56z-mJZgwevaVXUW1X6NOMMwp-4YT3F2WdMFpv700TDULpoWnMDyZBWGnMRrhkzlQ0GISoT_yQWdSWGVi51RyXcB5GMTH7hOYaSE3IThfi24pRV-6_SVJp4_0xSd6X4IX46ZKdlDw218bZSXDyzwobrymExcL1djTpfU7lvxm_0T6IYwPmIwDixwlEIDVe_7WT139Bbig"
              />
              <div className="absolute inset-0 bg-[#131b2e]/10 group-hover:bg-[#131b2e]/0 transition-colors duration-700 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Rendszer Funkciók (Features Grid) */}
      <section className="py-16 md:py-24 bg-white px-6" id="features">
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] max-w-[1280px] mx-auto text-center mb-16"
        >
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-semibold text-[#000000] mb-4">
            A Biztonságos Kezelés Három Alappillére
          </h2>
          <p className="font-['Inter'] text-base text-[#45464d] max-w-2xl mx-auto">
            Rendszerünk minden lépést lefed a bejelentéstől a megnyugtató,
            törvényes lezárásig.
          </p>
        </div>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            ref={addToRefs}
            className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] feature-card-glow p-8 rounded-2xl bg-[#f2f4f6] border border-transparent hover:-translate-y-2 premium-transition"
          >
            <div className="w-12 h-12 bg-[#131b2e]/5 rounded-lg flex items-center justify-center mb-6 text-[#131b2e]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-semibold text-[#000000] mb-4">
              Teljes Anonimitás
            </h3>
            <p className="font-['Inter'] text-sm text-[#45464d] leading-relaxed">
              Biztonságos, kétirányú, teljesen titkosított kommunikációs
              csatorna a bejelentő és a kijelölt vizsgálóbizottság között.
            </p>
          </div>
          {/* Card 2 */}
          <div
            ref={addToRefs}
            className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] feature-card-glow p-8 rounded-2xl bg-[#f2f4f6] border border-transparent hover:-translate-y-2 premium-transition transition-delay-100"
          >
            <div className="w-12 h-12 bg-[#006c4a]/5 rounded-lg flex items-center justify-center mb-6 text-[#006c4a]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-semibold text-[#000000] mb-4">
              Törvényi Megfelelés
            </h3>
            <p className="font-['Inter'] text-sm text-[#45464d] leading-relaxed">
              Automatikus határidő-követés és beépített figyelmeztetések a
              Panasztörvényben előírt 30 napos kivizsgálási kötelezettség
              tartásához.
            </p>
          </div>
          {/* Card 3 */}
          <div
            ref={addToRefs}
            className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] feature-card-glow p-8 rounded-2xl bg-[#f2f4f6] border border-transparent hover:-translate-y-2 premium-transition transition-delay-200"
          >
            <div className="w-12 h-12 bg-[#131b2e]/5 rounded-lg flex items-center justify-center mb-6 text-[#131b2e]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-semibold text-[#000000] mb-4">
              GDPR Biztonság
            </h3>
            <p className="font-['Inter'] text-sm text-[#45464d] leading-relaxed">
              Szigorúan EU-n belüli adattárolás és részletesen szabályozott,
              naplózott hozzáférés-kezelés.
            </p>
          </div>
        </div>
      </section>

      {/* Árazási Csomagok (Pricing Section) */}
      <section className="py-16 md:py-24 px-6 bg-[#f7f9fb]" id="pricing">
        <div className="max-w-[1280px] mx-auto">
          <div
            ref={addToRefs}
            className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] text-center mb-12"
          >
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-semibold text-[#000000] mb-6">
              Kiszámítható, Átlátható Árazás
            </h2>

            {/* Toggle Mechanism */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span
                className={`font-['Inter'] text-sm font-semibold transition-colors duration-200 ${!isAnnual ? "text-[#000000]" : "text-[#45464d]"}`}
              >
                Havi számlázás
              </span>
              <button
                onClick={handleBillingToggle}
                className="w-14 h-7 bg-[#e6e8ea] rounded-full relative ring-1 ring-[#c6c6cd]/30 overflow-hidden"
              >
                <div
                  className="absolute top-1 left-1 w-5 h-5 bg-[#131b2e] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                  style={{
                    transform: isAnnual ? "translateX(28px)" : "translateX(0)",
                  }}
                ></div>
              </button>
              <span
                className={`font-['Inter'] text-sm font-bold transition-colors duration-200 ${isAnnual ? "text-[#000000]" : "text-[#45464d]"}`}
              >
                Éves elszámolás{" "}
                <span className="text-[#006c4a] text-xs uppercase ml-1">
                  Spóroljon 20%-ot
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-end font-['Inter']">
            {/* Alap Csomag */}
            <div
              ref={addToRefs}
              className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] p-10 rounded-2xl border border-[#c6c6cd] bg-white hover:shadow-lg premium-transition"
            >
              <h3 className="text-xs font-bold text-[#45464d] uppercase mb-4 tracking-wider">
                Alap Csomag
              </h3>
              <div className="mb-6 h-16 flex items-baseline">
                <span
                  className={`text-4xl font-extrabold text-[#000000] transition-opacity duration-200 ${isUpdating ? "opacity-0" : "opacity-100"}`}
                >
                  {isAnnual ? "40.000 Ft" : "4.150 Ft"}
                </span>
                <span className="text-[#45464d] ml-1 text-sm">
                  {isAnnual ? "/év" : "/hó"}
                </span>
              </div>
              <p className="text-sm text-[#45464d] mb-6 min-h-[40px]">
                Ideális kisvállalkozásoknak. Teljes körű törvényi megfelelés és
                biztonságos bejelentési csatorna.
              </p>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#006c4a]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>{" "}
                  Törvényi megfelelési garancia
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#006c4a]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>{" "}
                  Anonim kétoldalú chat
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#006c4a]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>{" "}
                  Automatikus 30 napos követés
                </li>
              </ul>
              <button className="w-full py-4 border border-[#131b2e] text-[#131b2e] rounded-lg text-sm font-semibold hover:bg-[#131b2e] hover:text-white premium-transition">
                Kiválasztom
              </button>
            </div>

            {/* Nagyvállalat Csomag (Highlighted) */}
            <div
              ref={addToRefs}
              className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] p-10 rounded-2xl border-2 border-[#006c4a] bg-white shadow-2xl relative transition-delay-100"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#006c4a] text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">
                Kiemelt Ajánlat
              </div>
              <h3 className="text-xs font-bold text-[#006c4a] uppercase mb-4 tracking-wider">
                Nagyvállalat
              </h3>
              <div className="mb-6 h-16 flex items-baseline">
                <span className="text-5xl font-extrabold text-[#000000]">
                  Egyedi
                </span>
              </div>
              <p className="text-sm text-[#45464d] mb-6 min-h-[40px]">
                Közép- és nagyvállalkozások egyedi igényeire szabva. Személyre
                szabott arculat és integrációk.
              </p>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex items-center gap-3 font-semibold">
                  <svg
                    className="w-5 h-5 text-[#006c4a]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>{" "}
                  Egyedi arculat &amp; logó használat
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#006c4a]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>{" "}
                  Prioritásos 24/7 terméktámogatás
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#006c4a]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>{" "}
                  Oktatási anyagok &amp; Onboarding call
                </li>
              </ul>
              <button
                className="w-full py-4 bg-[#006c4a] text-white rounded-lg text-sm font-semibold glow-on-hover"
                type="button"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                Kapcsolatfelvétel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-16 md:py-24 bg-[#131b2e] text-[#76859b] px-6 overflow-hidden relative"
        id="testimonials"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#006c4a]/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div
              ref={addToRefs}
              className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)]"
            >
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl text-white mb-6 italic font-medium leading-snug">
                "Az Integria nemcsak a jogi kötelezettséget oldotta meg, de
                átláthatóbbá tette a belső folyamatainkat is."
              </h2>
              <div className="flex items-center gap-4 font-['Inter']">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Kovács János
                  </div>
                  <div className="text-xs">
                    Operatív Igazgató, Meridian Nyrt.
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={addToRefs}
              className="opacity-0 translate-y-[30px] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)]"
            >
              <div className="bg-white/5 backdrop-blur-lg p-10 rounded-2xl border border-white/10 hover:bg-white/10 premium-transition">
                <div className="flex gap-1 mb-6 text-[#006c4a]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-['Inter'] text-lg text-white/90 leading-relaxed italic mb-8">
                  "A bevezetési folyamat villámgyors volt, a felület tiszta és
                  érthető. Különösen szeretjük a beépített jogi
                  határidő-követőt, így soha nem csúszunk el."
                </p>
                <div className="font-['Inter'] text-xs font-semibold uppercase tracking-wider text-white/70">
                  — Németh Sarolta, HR Vezető, Vanguard Group
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 md:py-24 px-6 bg-[#f7f9fb] border-t border-[#e6e8ea]"
      >
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-semibold text-[#131b2e] mb-4">
            Kapcsolat
          </h2>
          <p className="font-['Inter'] text-base text-[#45464d] mb-10">
            Lépjen kapcsolatba velünk bizalommal bármilyen kérdés, ajánlatkérés
            vagy támogatás esetén.
          </p>
          <div className="flex flex-col gap-6 items-center justify-center text-left md:text-center">
            <div className="flex items-center gap-4">
              <svg
                className="w-6 h-6 text-[#006c4a]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5.75A2.75 2.75 0 015.75 3h12.5A2.75 2.75 0 0121 5.75v12.5A2.75 2.75 0 0118.25 21H5.75A2.75 2.75 0 013 18.25V5.75z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 5.75l-9 7.5-9-7.5"
                />
              </svg>
              <a
                href="mailto:info@integria.hu"
                className="text-[#131b2e] font-semibold hover:text-[#006c4a] transition-colors text-lg"
              >
                info@integria.hu
              </a>
            </div>
            <div className="flex items-center gap-4">
              <svg
                className="w-6 h-6 text-[#006c4a]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5h2l.4 2M7 10h10l1.6-3H5.4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 10v10a2 2 0 002 2h6a2 2 0 002-2V10"
                />
              </svg>
              <span className="text-[#131b2e] font-semibold text-lg">
                +36 1 234 5678
              </span>
            </div>
            <div className="flex items-center gap-4">
              <svg
                className="w-6 h-6 text-[#006c4a]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657A8 8 0 016.343 5.343"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-[#131b2e] text-lg">
                1132 Budapest, Váci út 22-24. Magyarország
              </span>
            </div>
            <div className="flex items-center gap-4">
              <svg
                className="w-6 h-6 text-[#006c4a]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2"
                />
              </svg>
              <span className="text-[#131b2e] text-lg">
                Hétfő–Péntek: 9:00–17:00
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer
      <footer className="bg-white w-full py-16 px-6 border-t border-[#c6c6cd]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#000000] mb-6">
              Integria
            </div>
            <p className="font-['Inter'] text-sm text-[#45464d] leading-relaxed">
              Professzionális, automatizált visszaélés-bejelentési és
              megfelelési platform modern vállalatoknak.
            </p>
          </div>
          {["Termék", "Jogi háttér", "Cégünk"].map((category, i) => (
            <div key={i} className="font-['Inter'] text-sm">
              <h4 className="font-semibold text-[#000000] mb-6">{category}</h4>
              <ul className="space-y-4 text-[#45464d]">
                <li>
                  <a
                    className="hover:text-[#006c4a] transition-colors duration-300"
                    href="#"
                  >
                    Funkciók
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#006c4a] transition-colors duration-300"
                    href="#"
                  >
                    Adatvédelem &amp; GDPR
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#006c4a] transition-colors duration-300"
                    href="#"
                  >
                    Kapcsolat
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-[1280px] mx-auto mt-20 pt-8 border-t border-[#c6c6cd]/30 flex flex-col md:flex-row justify-between items-center gap-4 font-['Inter'] text-xs text-[#45464d]/70">
          <p>
            © 2026 Integria. Minden jog fenntartva. Megfelelés a 2023. évi XXV.
            törvénynek.
          </p>
          <div className="flex gap-6">
            <a
              className="hover:text-[#006c4a] transition-colors duration-300"
              href="#"
            >
              Adatkezelési tájékoztató
            </a>
            <a
              className="hover:text-[#006c4a] transition-colors duration-300"
              href="#"
            >
              ÁSZF
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
