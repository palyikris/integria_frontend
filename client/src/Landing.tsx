export default function Landing() {
  return (
    <div className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Integria: Biztonságos Visszaélés-bejelentés
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          A 2023. évi XXV. törvény szerinti megfelelés automatizálva. Egyszerű,
          anonim és GDPR-kompatibilis rendszer vállalatoknak.
        </p>
        <a
          href="/portal"
          className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-600 transition"
        >
          Bejelentési rendszer megtekintése
        </a>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-slate-50 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">Teljes Anonimitás</h3>
            <p className="text-slate-600">
              Biztonságos, kétirányú kommunikáció a bejelentő és a
              vizsgálóbizottság között.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">Törvényi Megfelelés</h3>
            <p className="text-slate-600">
              Automatikus határidő-követés a 30 napos kivizsgálási
              kötelezettséghez.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">GDPR Biztonság</h3>
            <p className="text-slate-600">
              EU-n belüli adattárolás, titkosított adatbázis és szigorú
              hozzáférés-szabályozás.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* Pricing Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Árazási Csomagok
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2">Alap</h3>
            <p className="text-3xl font-bold mb-4">
              40.000 Ft<span className="text-sm font-normal">/év</span>
            </p>
            <p className="text-slate-600 mb-6 text-sm">
              Ideális kisvállalkozásoknak. Biztonságos csatorna és törvényi
              megfelelés.
            </p>
          </div>
          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2">Nagyvállalat</h3>
            <p className="text-3xl font-bold mb-4">Egyedi</p>
            <p className="text-slate-600 mb-6 text-sm">
              Közép- és nagyvállalkozásoknak. Egyedi igények és arculat, prioritásos támogatás, oktatási anyagok, onboarding call
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
