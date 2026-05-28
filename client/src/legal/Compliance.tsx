export default function Compliance() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">GDPR és Jogi Megfelelőség</h1>
      <section className="space-y-4 text-slate-700">
        <h2 className="text-xl font-semibold">Törvényi háttér</h2>
        <p>
          A rendszer teljes mértékben támogatja a 2023. évi XXV. törvény
          szerinti belső visszaélés-bejelentési rendszer követelményeit.
        </p>
        <h2 className="text-xl font-semibold mt-6">Biztonság</h2>
        <p>
          A rendszer végpontok közötti titkosítást (TLS 1.3) alkalmaz,
          biztosítva az adatok védelmét az átvitel során.
        </p>
        <h2 className="text-xl font-semibold mt-6">Hozzáférés-kezelés</h2>
        <p>
          A rendszer szigorú szerepkör-alapú hozzáférést (RBAC) alkalmaz,
          biztosítva, hogy a bejelentésekhez csak az arra felhatalmazott belső
          vizsgálati felelősök férhessenek hozzá.
        </p>
      </section>
    </div>
  );
}
