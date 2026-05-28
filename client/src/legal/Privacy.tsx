export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Adatvédelmi Tájékoztató</h1>
      <section className="space-y-4 text-slate-700">
        <p>
          Az Integria elkötelezett a bejelentők személyazonosságának védelme és
          az adatok bizalmas kezelése mellett.
        </p>
        <h2 className="text-xl font-semibold mt-6">
          Adatkezelő vs. Adatfeldolgozó
        </h2>
        <p>
          A megbízó vállalat a bejelentések tekintetében az Adatkezelő, míg az
          Integria kizárólag Adatfeldolgozóként jár el.
        </p>
        <h2 className="text-xl font-semibold mt-6">Adattárolás</h2>
        <p>
          Minden adat az Európai Unión belül, a Supabase (EU-Central)
          biztonságos szerverein kerül tárolásra, összhangban a GDPR
          előírásokkal.
        </p>
        <h2 className="text-xl font-semibold mt-6">Adatmegőrzés</h2>
        <p>
          A bejelentett adatokat a 2023. évi XXV. törvényben meghatározott
          vizsgálati határidőkig, de legfeljebb a törvényi előírások szerinti
          időtartamig kezeljük.
        </p>
      </section>
    </div>
  );
}
