export default function Footer() {
  return (
    <footer className="mt-10 py-6 border-t text-center text-sm text-slate-500">
      <a href="/legal/privacy" className="mx-2">
        Adatvédelmi Tájékoztató
      </a>{" "}
      |
      <a href="/legal/terms" className="mx-2">
        ÁSZF
      </a>{" "}
      |
      <a href="/legal/compliance" className="mx-2">
        Megfelelőség
      </a>
      <p className="mt-2">© 2026 Integria Compliance</p>
    </footer>
  );
}
