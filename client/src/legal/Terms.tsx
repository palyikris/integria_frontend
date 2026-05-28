export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">
        Általános Szerződési Feltételek
      </h1>
      <section className="space-y-4 text-slate-700">
        <h2 className="text-xl font-semibold">Szolgáltatás leírása</h2>
        <p>
          Az Integria egy technikai platformot biztosít a visszaélések
          bejelentésére és azok kezelésére.
        </p>
        <h2 className="text-xl font-semibold mt-6">Jogi Felelősségkizárás</h2>
        <p>
          A szolgáltató nem nyújt jogi tanácsadást. A jogszabályi megfelelés
          (pl. 30 napos kivizsgálási határidő) betartása kizárólag a megbízó
          vállalat felelőssége.
        </p>
        <h2 className="text-xl font-semibold mt-6">
          Szolgáltatási Szint (SLA)
        </h2>
        <p>
          A rendszer rendelkezésre állása "kereskedelmileg elvárható legjobb
          erőfeszítés" alapú. A szolgáltató nem felelős a harmadik fél által
          okozott üzemzavarokért.
        </p>
      </section>
    </div>
  );
}
