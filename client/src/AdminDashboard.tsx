import { useEffect, useState } from "react";
import { Trash2, Power, PowerOff, Plus, Edit, X } from "lucide-react";
import { supabase } from "./lib/supabase";

export default function AdminDashboard() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);

  // Create Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#0f172a");
  const [logoUrl, setLogoUrl] = useState("");

  // Edit Modal State
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPrimaryColor, setEditPrimaryColor] = useState("#0f172a");
  const [editLogoUrl, setEditLogoUrl] = useState("");

  const fetchCompanies = async () => {
    const { data } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setCompanies(data);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchCompanies();
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    await supabase.auth.signInWithPassword({
      email: target.email.value,
      password: target.password.value,
    });
    window.location.reload();
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("companies").insert([
      {
        name,
        slug,
        liaison_email: email,
        primary_color: primaryColor,
        logo_url: logoUrl,
      },
    ]);
    setName("");
    setSlug("");
    setEmail("");
    setLogoUrl("");
    setPrimaryColor("#0f172a");
    fetchCompanies();
  };

  const openEditModal = (company: any) => {
    setEditingCompany(company);
    setEditName(company.name);
    setEditSlug(company.slug);
    setEditEmail(company.liaison_email);
    setEditPrimaryColor(company.primary_color || "#0f172a");
    setEditLogoUrl(company.logo_url || "");
  };

  const handleUpdateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase
      .from("companies")
      .update({
        name: editName,
        slug: editSlug,
        liaison_email: editEmail,
        primary_color: editPrimaryColor,
        logo_url: editLogoUrl,
      })
      .eq("id", editingCompany.id);

    setEditingCompany(null);
    fetchCompanies();
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    await supabase
      .from("companies")
      .update({ is_active: !currentStatus })
      .eq("id", id);
    fetchCompanies();
  };

  const deleteCompany = async (id: string) => {
    if (window.confirm("Biztosan törlöd? Ez minden panaszt is töröl!")) {
      await supabase.from("companies").delete().eq("id", id);
      fetchCompanies();
    }
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 bg-white rounded-xl shadow-sm border border-slate-200"
        >
          <h2 className="text-xl font-bold mb-6 text-slate-900">
            Integria Admin
          </h2>
          <input
            name="email"
            type="email"
            placeholder="Admin E-mail"
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Jelszó"
            required
            className="w-full mb-6 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-slate-900 text-white p-2 rounded"
          >
            Bejelentkezés
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Master Dashboard</h1>
        <button
          onClick={() =>
            supabase.auth.signOut().then(() => window.location.reload())
          }
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          Kijelentkezés
        </button>
      </div>

      {/* CREATE NEW COMPANY */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Új Ügyfél Hozzáadása
        </h2>
        <form
          onSubmit={handleCreateCompany}
          className="flex flex-wrap gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Cégnév (pl. Teszt Kft.)"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 min-w-[200px] p-2 border border-slate-300 rounded focus:border-slate-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="URL Slug (pl. teszt-kft)"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="flex-1 min-w-[150px] p-2 border border-slate-300 rounded focus:border-slate-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Kapcsolattartó E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-[200px] p-2 border border-slate-300 rounded focus:border-slate-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Logo URL (opcionális)"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="flex-1 min-w-[200px] p-2 border border-slate-300 rounded focus:border-slate-500 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500">Márkaszín:</label>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-10 h-10 p-1 border border-slate-300 rounded cursor-pointer"
              title="Céges arculati szín"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded font-medium hover:bg-emerald-700 transition"
          >
            Hozzáadás
          </button>
        </form>
      </div>

      {/* CLIENT LIST */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-medium text-slate-600">Ügyfél neve</th>
              <th className="p-4 font-medium text-slate-600">Arculat</th>
              <th className="p-4 font-medium text-slate-600">Nyilvános Link</th>
              <th className="p-4 font-medium text-slate-600">Állapot</th>
              <th className="p-4 font-medium text-slate-600 text-right">
                Műveletek
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr
                key={company.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
              >
                <td className="p-4 font-medium text-slate-900">
                  {company.name}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border border-slate-200"
                      style={{
                        backgroundColor: company.primary_color || "#0f172a",
                      }}
                      title="Márkaszín"
                    />
                    {company.logo_url && (
                      <img
                        src={company.logo_url}
                        alt="Logo"
                        className="h-6 object-contain"
                        title="Céges Logó"
                      />
                    )}
                  </div>
                </td>
                <td className="p-4 text-slate-500">
                  <a
                    href={`/form/${company.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    /form/{company.slug}
                  </a>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${company.is_active ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}
                  >
                    {company.is_active ? "Aktív" : "Felfüggesztve"}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <button
                    onClick={() => openEditModal(company)}
                    className="p-2 bg-indigo-50 rounded hover:bg-indigo-100 transition"
                    title="Szerkesztés"
                  >
                    <Edit className="w-4 h-4 text-indigo-600" />
                  </button>
                  <button
                    onClick={() => toggleStatus(company.id, company.is_active)}
                    className="p-2 bg-slate-100 rounded hover:bg-slate-200 transition"
                    title="Felfüggesztés / Aktiválás"
                  >
                    {company.is_active ? (
                      <Power className="w-4 h-4 text-slate-600" />
                    ) : (
                      <PowerOff className="w-4 h-4 text-rose-600" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteCompany(company.id)}
                    className="p-2 bg-rose-50 rounded hover:bg-rose-100 transition"
                    title="Végleges Törlés"
                  >
                    <Trash2 className="w-4 h-4 text-rose-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL OVERLAY */}
      {editingCompany && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900">
                Cégadatok szerkesztése
              </h3>
              <button
                onClick={() => setEditingCompany(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateCompany} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Cégnév
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-slate-500 focus:outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded focus:border-slate-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Kapcsolattartó E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded focus:border-slate-500 focus:outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Logo URL (Opcionális)
                </label>
                <input
                  type="text"
                  value={editLogoUrl}
                  onChange={(e) => setEditLogoUrl(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:border-slate-500 focus:outline-none text-sm"
                  placeholder="https://..."
                />
                {editLogoUrl && (
                  <img
                    src={editLogoUrl}
                    alt="Preview"
                    className="mt-2 h-8 object-contain"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Márkaszín
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={editPrimaryColor}
                    onChange={(e) => setEditPrimaryColor(e.target.value)}
                    className="w-12 h-10 p-1 border border-slate-300 rounded cursor-pointer"
                  />
                  <span className="text-sm text-slate-500 uppercase">
                    {editPrimaryColor}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded hover:bg-slate-200 transition"
                >
                  Mégsem
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded hover:bg-slate-800 transition"
                >
                  Mentés
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
