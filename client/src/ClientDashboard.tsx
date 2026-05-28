import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { supabase } from "./lib/supabase";

export default function ClientDashboard() {
  const [session, setSession] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setComplaints(data);
    setLoading(false);
  };


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchComplaints();
      else setLoading(false);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const { error } = await supabase.auth.signInWithPassword({
      email: target.email.value,
      password: target.password.value,
    });
    if (error) alert("Hibás bejelentkezési adatok.");
    else window.location.reload();
  };

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase
      .from("complaints")
      .update({ status: newStatus })
      .eq("id", id);
    setSelectedComplaint({ ...selectedComplaint, status: newStatus });
    fetchComplaints();
  };

  const downloadEvidence = async (path: string) => {
    const { data } = await supabase.storage
      .from("evidence")
      .createSignedUrl(path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
    else alert("Hiba történt a fájl letöltésekor.");
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 transition-colors">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 bg-white rounded-xl shadow-sm border border-slate-200"
        >
          <h2 className="text-xl font-bold mb-2 text-slate-900">
            Vállalati Belépés
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Panaszkezelési és vizsgálati portál
          </p>
          <input
            name="email"
            type="email"
            placeholder="Céges E-mail"
            required
            className="w-full mb-4 p-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900"
          />
          <input
            name="password"
            type="password"
            placeholder="Jelszó"
            required
            className="w-full mb-6 p-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-900"
          />
          <button
            type="submit"
            className="w-full bg-slate-900 text-white p-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition"
          >
            Bejelentkezés
          </button>
        </form>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Új
          </span>
        );
      case "under_review":
        return (
          <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> Folyamatban
          </span>
        );
      case "resolved":
        return (
          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Lezárva
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 transition-colors py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-slate-200 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Panaszkezelési Portál
            </h1>
            <p className="text-sm text-slate-500">
              2023. évi XXV. törvény szerinti ügyek
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                supabase.auth.signOut().then(() => window.location.reload())
              }
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-medium px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm transition"
            >
              <LogOut className="w-4 h-4" /> Kijelentkezés
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-[800px] flex flex-col">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-semibold text-slate-800">
              Beérkezett ügyek
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center text-sm text-slate-500">
                  Betöltés...
                </div>
              ) : complaints.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500">
                  Nincsenek aktív bejelentések.
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {complaints.map((c) => (
                    <li
                      key={c.id}
                      onClick={() => setSelectedComplaint(c)}
                      className={`p-4 cursor-pointer transition hover:bg-slate-50 ${selectedComplaint?.id === c.id ? "bg-slate-50 border-l-4 border-slate-900" : "border-l-4 border-transparent"}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-slate-400">
                          {new Date(c.created_at).toLocaleDateString("hu-HU")}
                        </span>
                        {getStatusBadge(c.status)}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">
                        {c.subject}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {c.category}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedComplaint ? (
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      {selectedComplaint.subject}
                    </h2>
                    <div className="flex gap-4 text-sm text-slate-500">
                      <span>
                        <strong>Dátum:</strong>{" "}
                        {new Date(selectedComplaint.created_at).toLocaleString(
                          "hu-HU",
                        )}
                      </span>
                      <span>
                        <strong>ID:</strong>{" "}
                        {selectedComplaint.id.split("-")[0]}
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-auto">
                    <select
                      value={selectedComplaint.status}
                      onChange={(e) =>
                        updateStatus(selectedComplaint.id, e.target.value)
                      }
                      className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
                    >
                      <option value="new">Állapot: Új</option>
                      <option value="under_review">
                        Állapot: Vizsgálat alatt
                      </option>
                      <option value="resolved">Állapot: Lezárva</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm">
                  <div>
                    <span className="text-slate-500 block mb-1">
                      Kategória:
                    </span>
                    <strong className="text-slate-900">
                      {selectedComplaint.category}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">
                      Kapcsolat:
                    </span>
                    <strong className="text-slate-900">
                      {selectedComplaint.relation_to_company}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">
                      Érintettek:
                    </span>
                    <strong className="text-slate-900">
                      {selectedComplaint.involved_parties || "-"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">
                      Esemény ideje:
                    </span>
                    <strong className="text-slate-900">
                      {selectedComplaint.incident_date || "-"}
                    </strong>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <span className="text-slate-500 block mb-1">
                      Bejelentő E-mail:
                    </span>
                    <strong className="text-slate-900">
                      {selectedComplaint.reporter_email || "Teljesen Anonim"}
                    </strong>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                    Részletes Leírás
                  </h3>
                  <div className="p-4 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedComplaint.content}
                  </div>
                </div>

                {selectedComplaint.attached_file_path && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                      Csatolt Bizonyítékok
                    </h3>
                    <button
                      onClick={() =>
                        downloadEvidence(selectedComplaint.attached_file_path)
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-sm font-medium hover:bg-indigo-100 transition"
                    >
                      <FileText className="w-4 h-4" /> Fájl megtekintése /
                      Letöltés <Download className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-xl border-dashed h-[800px] flex items-center justify-center text-slate-400 flex-col gap-3">
                <FileText className="w-12 h-12 text-slate-300" />
                <p>Válasszon ki egy ügyet a részletek megtekintéséhez.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
